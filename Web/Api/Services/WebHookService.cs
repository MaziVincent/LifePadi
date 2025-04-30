using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.Interfaces;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Api.DTO;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;

namespace Api.Services
{
    public class WebHookService : IWebHookService
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly ILogger<WebHookService> _logger;
        private readonly IVoucher _voucherService;

        public WebHookService(DBContext dbContext, IMapper mapper, IConfiguration config, ILogger<WebHookService> logger, IVoucher voucherService)
        {
            _voucherService = voucherService;
            _config = config;
            _logger = logger;
            _context = dbContext;
            _mapper = mapper;
        }
        

        public async Task<bool> ValidateSignature(string payload, string signature)
        {
            try
            {
                using var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(_config["Paystack:Secret_Key"]!));
                var computedSignature = BitConverter.ToString(
                    hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)))
                    .Replace("-", "")
                    .ToLower();

                return computedSignature == signature;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error validating Paystack signature");
                return false;
            }
        }

        public async Task ProcessWebhookEvent(PaystackWebhookEvent paystackEvent)
        {
            if (paystackEvent.Event == "charge.success")
            {
                // Determine transaction type
                if (paystackEvent.Data.metadata!.walletId != null)
                {
                    await ProcessWalletDeposit(paystackEvent.Data);
                }
                else if (paystackEvent.Data.metadata.orderId != null)
                {
                    await ProcessOrderPayment(paystackEvent.Data);
                }
                else
                {
                    _logger.LogWarning($"Unknown transaction type for reference: {paystackEvent.Data.reference}");
                }
            }
            else
            {
                _logger.LogInformation($"Received unhandled Paystack event: {paystackEvent.Event}");
            }
        }

        public async Task ProcessOrderPayment(PaystackVerificationData data)
        {
            try
            {
                var existingTransaction = await _context.Transactions
                    .FirstOrDefaultAsync(t => t.TransactionRef == data.reference);

                if (existingTransaction != null) return;

                var transaction = new Transaction
                {
                    Status = data.status,
                    StatusBool = true,
                    AmountPaid = (double)data.amount! / 100,
                    TransactionRef = data.reference,
                    PaymentId = (BigInteger)data.id,
                    TotalAmount = data.metadata!.totalAmount,
                    OrderId = data.metadata.orderId,
                    DeliveryFee = data.metadata.deliveryFee,
                    PaidAt = data.paid_at,
                    PaymentChannel = data.channel,
                    SubTotal = data.metadata.amount,
                    Type = data.metadata.type
                };

                // Handle voucher if exists
                if (!string.IsNullOrEmpty(data.metadata.voucherCode))
                {
                    await ProcessVoucher(data, transaction);
                }

                // Update order status
                var order = await _context.Orders.FindAsync(data.metadata.orderId);
                if (order != null)
                {
                    order.Status = "Ongoing";
                    order.PaymentMethod = "PayStack";
                    order.SearchString = $"{order.Status.ToUpper()} {order.Type?.ToUpper()} {order.Order_Id}";
                }

                await _context.Transactions.AddAsync(transaction);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Processed order payment: {data.reference}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing order payment: {data.reference}");
                throw;
            }
        }

        public async Task ProcessWalletDeposit(PaystackVerificationData data)
        {
            try
            {

                var transaction = new Transaction
                {
                    Status = data.status,
                    StatusBool = true,
                    AmountPaid = (double)data.amount! / 100,
                    TransactionRef = data.reference,
                    PaymentId = (BigInteger)data.id,
                    TotalAmount = data.metadata!.amount,
                    PaidAt = data.paid_at,
                    PaymentChannel = data.channel,
                    Type = "Deposit",
                    WalletId = data.metadata.walletId
                };
                var CurrentDepsit = await _context.Deposites.Where(d => d.ReferenceId == data.reference).FirstOrDefaultAsync();
                if (CurrentDepsit is null)
                {
                    var deposit = new Deposite
                    {
                        Status = data.status,
                        Type = "Deposit",
                        TransactionId = (BigInteger)data.id,
                        Amount = (double)data.amount / 100,
                        ReferenceId = data.reference,
                        WalletId = (int)data.metadata.walletId!,
                        CreatedAt = data.paid_at ?? DateTime.UtcNow,
                        UpdatedAt = data.paid_at ?? DateTime.UtcNow,
                        PaymentMethod = data.channel
                    };

                    var wallet = await _context.Wallets.FindAsync(data.metadata.walletId);
                    if (wallet == null)
                    {
                        _logger.LogError($"Wallet not found for deposit: {data.reference}");
                        return;
                    }

                    wallet.InitialBalance = wallet.Balance;
                    wallet.Balance += deposit.Amount;
                    wallet.UpdatedAt = DateTime.UtcNow;

                    await _context.Deposites.AddAsync(deposit);
                    await _context.Transactions.AddAsync(transaction);
                    _context.Wallets.Update(wallet);
                    await _context.SaveChangesAsync();

                }
                else
                {

                    CurrentDepsit.Status = data.status;
                    CurrentDepsit.TransactionId = (BigInteger)data.id;
                    CurrentDepsit.UpdatedAt = data.paid_at ?? DateTime.UtcNow;
                    CurrentDepsit.PaymentMethod = data.channel;
                   

                    var wallet = await _context.Wallets.FindAsync(data.metadata.walletId);
                    if (wallet == null)
                    {
                        _logger.LogError($"Wallet not found for deposit: {data.reference}");
                        return;
                    }

                    wallet.InitialBalance = wallet.Balance;
                    wallet.Balance += CurrentDepsit.Amount;
                    wallet.UpdatedAt = DateTime.UtcNow;

                     _context.Deposites.Update(CurrentDepsit);
                    await _context.Transactions.AddAsync(transaction);
                    _context.Wallets.Update(wallet);
                    await _context.SaveChangesAsync();
                }


               

                _logger.LogInformation($"Processed wallet deposit: {data.reference}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing wallet deposit: {data.reference}");
                throw;
            }
        }

        private async Task ProcessVoucher(PaystackVerificationData data, Transaction transaction)
        {
            try
            {
                var voucher = await _voucherService.searchWithCode(data.metadata!.voucherCode!);
                var order = await _context.Orders.FindAsync(transaction.OrderId);

                if (order == null) return;

                var customerVoucher = await _context.CustomerVouchers
                    .FirstOrDefaultAsync(cv => cv.CustomerId == order.CustomerId && cv.VoucherId == voucher.Id);

                if (customerVoucher == null)
                {
                    var newCustomerVoucher = new CustomerVoucher
                    {
                        CustomerId = order.CustomerId,
                        VoucherId = voucher.Id,
                        TransactionId = transaction.Id
                    };
                    await _context.CustomerVouchers.AddAsync(newCustomerVoucher);
                }
                else
                {
                    customerVoucher.TransactionId = transaction.Id;
                }

                transaction.VoucherId = voucher.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing voucher for transaction: {data.reference}");
            }
        }
    }
}