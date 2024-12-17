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
        readonly string errorMsg = "Wallet not found";
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

    }
}