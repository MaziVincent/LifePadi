using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class WalletService : IWallet
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        private readonly DepositeService _depositeService;
        private readonly WithdrawalService _withdrawalService;
        readonly string errorMsg = "Wallet not found";
        public WalletService(DBContext context, IMapper mapper, DepositeService depositeService, WithdrawalService withdrawalService)
        {
            _context = context;
            _mapper = mapper;
            _depositeService = depositeService;
            _withdrawalService = withdrawalService;
        }
        public async Task<WalletDto> createAsync(WalletDto walletDto)
        {
            try
            {
                Wallet wallet = _mapper.Map<Wallet>(walletDto);
                await _context.Wallets.AddAsync(wallet);
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletDto>(wallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                _context.Wallets.Remove(wallet);
                await _context.SaveChangesAsync();
                return "Wallet deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> depositAsync(int id, double amount)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                var deposite = await _depositeService.createAsync(new DepositeDto
                {
                    Amount = amount,
                    WalletId = wallet.Id,
                    Type = "Deposit"
                });
                wallet.InitialBalance = wallet.Balance;
                wallet.Balance += amount;
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletDto>(wallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WalletDto>> getAllAsync()
        {
            try
            {
                List<Wallet> wallets = await _context.Wallets
                .Include(w => w.Customer)
                .Include(w => w.Deposites)
                .Include(w => w.Withdrawals)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WalletDto>>(wallets);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> getAsync(int id)
        {
            try
            {
                Wallet wallet = await _context.Wallets
                .Include(w => w.Customer)
                .Include(w => w.Deposites)
                .Include(w => w.Withdrawals)
                .FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                return _mapper.Map<WalletDto>(wallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<double> getBalance(int id)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                return wallet.Balance;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> getCustomerWalletStat(int customerId)
        {
            try
            {
                var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.CustomerId == customerId) ?? throw new Exceptions.ServiceException(errorMsg);
                var totalWithdrawal = await _context.Withdrawals.Where(w => w.WalletId == wallet.Id).SumAsync(w => w.Amount);
                var totalDeposite = await _context.Deposites.Where(w => w.WalletId == wallet.Id).SumAsync(w => w.Amount);
                return new
                {
                    TotalDeposite = totalDeposite,
                    TotalWithdrawal = totalWithdrawal,
                    Balance = wallet.Balance,
                    InitialBalance = wallet.InitialBalance
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<double> getInitialBalance(int id)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                return wallet.InitialBalance;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> getWalletByCustomerId(int customerId)
        {
            try
            {
                Wallet wallet = await _context.Wallets
                .Include(w => w.Customer)
                .Include(w => w.Deposites)
                .Include(w => w.Withdrawals)
                .FirstOrDefaultAsync(w => w.CustomerId == customerId) ?? throw new Exceptions.ServiceException(errorMsg);
                return _mapper.Map<WalletDto>(wallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> transferAsync(int fromId, int toId, double amount)
        {
            try
            {
                Wallet fromWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == fromId) ?? throw new Exceptions.ServiceException("Sender wallet not found");
                Wallet toWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == toId) ?? throw new Exceptions.ServiceException("Receiver wallet not found");
                if (fromWallet.Balance < amount)
                {
                    throw new Exceptions.ServiceException("Insufficient balance");
                }
                fromWallet.InitialBalance = fromWallet.Balance;
                fromWallet.Balance -= amount;
                toWallet.InitialBalance = toWallet.Balance;
                toWallet.Balance += amount;
                //make a deposite record for towalletId and make a withdrawal record for fromWalletId and create the notification
                var withdrawal = await _withdrawalService.createAsync(new WithdrawalDto
                {
                    Amount = amount,
                    WalletId = fromWallet.Id,
                    Type = "Transfer"
                });
                var deposite = await _depositeService.createAsync(new DepositeDto
                {
                    Amount = amount,
                    WalletId = toWallet.Id,
                    Type = "Transfer"
                });
                var fromWalletNotification = new WalletNotification
                {
                    WalletId = fromWallet.Id,
                    Message = $"You transfered {amount} to {toWallet.Customer?.FirstName} {toWallet.Customer?.LastName}",
                    Title = "Transfer out",
                    Type = "Transfer",
                }; 
                var toWalletNotification = new WalletNotification
                {
                    WalletId = toWallet.Id,
                    Message = $"You received {amount} from {fromWallet.Customer?.FirstName} {fromWallet.Customer?.LastName}",
                    Title = "Transfer in",
                    Type = "Transfer",
                };
                _context.Wallets.Attach(fromWallet);
                _context.Wallets.Attach(toWallet);
                await _context.Deposites.AddAsync(_mapper.Map<Deposite>(deposite));
                await _context.Withdrawals.AddAsync(_mapper.Map<Withdrawal>(withdrawal));
                await _context.WalletNotifications.AddAsync(fromWalletNotification);
                await _context.WalletNotifications.AddAsync(toWalletNotification);
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletDto>(fromWallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> updateAsync(int id, WalletDto walletDto)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                wallet.Balance = walletDto.Balance;
                wallet.InitialBalance = walletDto.InitialBalance;
                wallet.CustomerId = walletDto.CustomerId;
                wallet.UpdatedAt = DateTime.UtcNow;
                _context.Wallets.Attach(wallet);
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletDto>(wallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> withdrawAsync(int id, double amount)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                if (wallet.Balance < amount)
                {
                    throw new Exceptions.ServiceException("Insufficient balance");
                }
                var withdrawal = await _withdrawalService.createAsync(new WithdrawalDto
                {
                    Amount = amount,
                    WalletId = wallet.Id,
                    Type = "Withdrawal"
                });
                wallet.InitialBalance = wallet.Balance;
                wallet.Balance -= amount;
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletDto>(wallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}