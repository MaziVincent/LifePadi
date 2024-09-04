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
        string errorMsg = "Wallet not found";
        public WalletService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
                .Include(w => w.customer).OrderByDescending(w => w.CreatedAt).ToListAsync();
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
                .Include(w => w.customer).FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
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
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.CustomerId == customerId) ?? throw new Exceptions.ServiceException(errorMsg);
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
                var fromWalletNotification = new WalletNotification
                {
                    WalletId = fromWallet.Id,
                    Message = $"You transfered {amount} to {toWallet.customer?.FirstName} {toWallet.customer?.LastName}",
                    Title = "Transfer",
                    Type = "Transfer",
                }; 
                var toWalletNotification = new WalletNotification
                {
                    WalletId = toWallet.Id,
                    Message = $"You received {amount} from {fromWallet.customer?.FirstName} {fromWallet.customer?.LastName}",
                    Title = "Transfer",
                    Type = "Transfer",
                };
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletDto>(fromWallet);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WalletDto> updateAsync(WalletDto walletDto)
        {
            try
            {
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == walletDto.Id) ?? throw new Exceptions.ServiceException(errorMsg);
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