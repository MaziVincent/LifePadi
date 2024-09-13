using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class WithdrawalService : IWalletDepositeAndWithdrawal<WithdrawalDto>
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        string errorMsg = "Withdrawal not found";
        public WithdrawalService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<WithdrawalDto> createAsync(WithdrawalDto t)
        {
            try
            {
                var withdrawal = _mapper.Map<Withdrawal>(t);
                await _context.Withdrawals.AddAsync(withdrawal);
                await _context.SaveChangesAsync();
                return _mapper.Map<WithdrawalDto>(withdrawal);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> customerTransactionStats(int customerId)
        {
            try
            {
                var totalAmountWithdrawn = await _context.Withdrawals.Where(w => w.Wallet!.CustomerId == customerId).AsQueryable().ToListAsync();
                var totalAmountDeposited = await _context.Deposites.Where(w => w.Wallet!.CustomerId == customerId).AsQueryable().ToListAsync();
                var totalAmountWithdrawnSum = totalAmountWithdrawn.Sum(w => w.Amount);
                var totalAmountDepositedSum = totalAmountDeposited.Sum(w => w.Amount);
                var totalAmount = totalAmountDepositedSum - totalAmountWithdrawnSum;
                return new
                {
                    totalAmountDeposited = totalAmountDepositedSum,
                    totalAmountWithdrawn = totalAmountWithdrawnSum,
                    totalAmount = totalAmount
                };
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
                var withdrawal = await _context.Withdrawals.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                _context.Withdrawals.Remove(withdrawal);
                await _context.SaveChangesAsync();
                return "Withdrawal deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getAll()
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<WithdrawalDto>> getAllAsync(SearchPaging props)
        {
            try
            {
                IQueryable<WithdrawalDto> withdrawalList = Enumerable.Empty<WithdrawalDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var firstwithdrawals = await _context.Withdrawals
                     .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                     .OrderByDescending(w => w.CreatedAt).ToListAsync();
                    
                    withdrawalList.Concat(_mapper.Map<List<WithdrawalDto>>(firstwithdrawals).AsQueryable());
                    var result = PagedList<WithdrawalDto>.ToPagedList(withdrawalList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var withdrawals = await _context.Withdrawals
                    .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                    .Where(w => w.Wallet!.Customer!.FirstName!.Contains(props.SearchString) || w.Wallet!.Customer!.LastName!.Contains(props.SearchString))
                    .OrderByDescending(w => w.CreatedAt).ToListAsync();
                    withdrawalList.Concat(_mapper.Map<List<WithdrawalDto>>(withdrawals).AsQueryable());
                    var result = PagedList<WithdrawalDto>.ToPagedList(withdrawalList, props.PageNumber, props.PageSize);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WithdrawalDto> getAsync(int id)
        {
            try
            {
                var withdrawal = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                return _mapper.Map<WithdrawalDto>(withdrawal);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByAmountRange(double startAmount, double endAmount)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.Amount >= startAmount && w.Amount <= endAmount)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByCustomerId(int customerId)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.Wallet!.CustomerId == customerId)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByDate(DateTime date)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.CreatedAt!.Value.Date == date.Date)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.CreatedAt!.Value.Date >= startDate.Date && w.CreatedAt!.Value.Date <= endDate.Date)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByDateRangeForCustomer(int CustomerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.Wallet!.CustomerId == CustomerId && w.CreatedAt!.Value.Date >= startDate.Date && w.CreatedAt!.Value.Date <= endDate.Date)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByPaymentMethod(string paymentMethod)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.PaymentMethod == paymentMethod)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByReferenceId(string referenceId)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.ReferenceId == referenceId)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByStatus(string status)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.Status == status)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByTransactionId(BigInteger transactionId)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.TransactionId == transactionId)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<WithdrawalDto>> getByWalletIdAsync(int walletId)
        {
            try
            {
                var withdrawals = await _context.Withdrawals
                .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                .Where(w => w.WalletId == walletId)
                .OrderByDescending(w => w.CreatedAt).ToListAsync();
                return _mapper.Map<List<WithdrawalDto>>(withdrawals);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<WithdrawalDto>> getByWalletId(int walletId, SearchPaging props)
        {
            try
            {
                IQueryable<WithdrawalDto> withdrawalList = Enumerable.Empty<WithdrawalDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var firstwithdrawals = await _context.Withdrawals
                     .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                     .Where(w => w.WalletId == walletId)
                     .OrderByDescending(w => w.CreatedAt).ToListAsync();
                    
                    withdrawalList.Concat(_mapper.Map<List<WithdrawalDto>>(firstwithdrawals).AsQueryable());
                    var result = PagedList<WithdrawalDto>.ToPagedList(withdrawalList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var withdrawals = await _context.Withdrawals
                    .Include(w => w.Wallet).ThenInclude(w => w!.Customer)
                    .Where(w => w.WalletId == walletId && (w.Wallet!.Customer!.FirstName!.Contains(props.SearchString) || w.Wallet!.Customer!.LastName!.Contains(props.SearchString)))
                    .OrderByDescending(w => w.CreatedAt).ToListAsync();
                    withdrawalList.Concat(_mapper.Map<List<WithdrawalDto>>(withdrawals).AsQueryable());
                    var result = PagedList<WithdrawalDto>.ToPagedList(withdrawalList, props.PageNumber, props.PageSize);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<double> totalAmountByWalletId(int WalletId)
        {
            try
            {
                var totalAmount = await _context.Withdrawals.Where(w => w.WalletId == WalletId).SumAsync(w => w.Amount);
                return totalAmount;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<WithdrawalDto> updateAsync(int id, WithdrawalDto t)
        {
            try
            {
                var initialWithdrawal = await _context.Withdrawals.FirstOrDefaultAsync(w => w.Id == id) ?? throw new Exceptions.ServiceException(errorMsg);
                var withdrawal = _mapper.Map<Withdrawal>(t);
                withdrawal.UpdatedAt = DateTime.UtcNow;
                _context.Withdrawals.Update(withdrawal);
                await _context.SaveChangesAsync();
                return _mapper.Map<WithdrawalDto>(withdrawal);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
