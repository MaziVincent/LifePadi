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
    public class DepositeService : IWalletDepositeAndWithdrawal<DepositeDto>
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public DepositeService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        readonly string errorMessage = "Deposite not found";
        public async Task<DepositeDto> createAsync(DepositeDto t)
        {
            try
            {
                var deposite = _mapper.Map<Deposite>(t);
                await _context.Deposites.AddAsync(deposite);
                await _context.SaveChangesAsync();
                return _mapper.Map<DepositeDto>(deposite);
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
                var totalDeposite = await _context.Deposites.Where(d => d.Wallet!.CustomerId == customerId).AsQueryable().ToListAsync();
                var totalWithdrawal = await _context.Withdrawals.Where(x => x.Wallet!.CustomerId == customerId).AsQueryable().ToListAsync();
                var totalDepositeSum = totalDeposite.Sum(x => x.Amount);
                var totalWithdrawalSum = totalWithdrawal.Sum(x => x.Amount);
                var totalTransaction = totalDepositeSum + totalWithdrawalSum;
                var totalBalance = totalDepositeSum - totalWithdrawalSum;
                return new
                {
                    totalDeposite = totalDepositeSum,
                    totalWithdrawal = totalWithdrawalSum,
                    totalTransaction = totalTransaction,
                    totalBalance = totalBalance
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
                var deposite = await _context.Deposites.FirstOrDefaultAsync(d => d.Id == id);
                if (deposite == null)
                {
                    throw new Exceptions.ServiceException(errorMessage);
                }
                _context.Deposites.Remove(deposite);
                await _context.SaveChangesAsync();
                return "Deposite deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getAllAsync()
        {
            try
            {
                var deposite = await _context.Deposites.AsQueryable().ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<DepositeDto>> getAllAsync(SearchPaging props)
        {
            try
            {
                IQueryable<DepositeDto> DepositeList = Enumerable.Empty<DepositeDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var deposites = await _context.Deposites
                    .Include(d => d.Wallet)
                    .ThenInclude(w => w!.Customer)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var deposites = await _context.Deposites
                    .Include(d => d.Wallet)
                    .ThenInclude(w => w!.Customer)
                    .Where(d => d.Wallet!.Customer!.FirstName!.Contains(props.SearchString))
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DepositeDto> getAsync(int id)
        {
            try
            {
                var deposite = await _context.Deposites
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .FirstOrDefaultAsync(d => d.Id == id);
                return _mapper.Map<DepositeDto>(deposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByAmountRange(double startAmount, double endAmount)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.Amount >= startAmount && d.Amount <= endAmount)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .AsQueryable().ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByCustomerId(int customerId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.Wallet!.CustomerId == customerId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByDate(DateTime date)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.CreatedAt!.Value.Date == date.Date)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.CreatedAt!.Value.Date >= startDate.Date && d.CreatedAt!.Value.Date <= endDate.Date)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByDateRangeForCustomer(int CustomerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.CreatedAt!.Value.Date >= startDate.Date && d.CreatedAt!.Value.Date <= endDate.Date && d.Wallet!.CustomerId == CustomerId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByPaymentMethod(string paymentMethod)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.PaymentMethod!.ToLower() == paymentMethod.ToLower())
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByReferenceId(string referenceId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.ReferenceId!.ToLower() == referenceId.ToLower())
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByStatus(string status)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.Status!.ToLower() == status.ToLower())
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByTransactionId(BigInteger transactionId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.TransactionId == transactionId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByWalletId(int walletId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.WalletId == walletId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<DepositeDto>> getByWalletId(int walletId, SearchPaging props)
        {
            try
            {
                IQueryable<DepositeDto> DepositeList = Enumerable.Empty<DepositeDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var deposites = await _context.Deposites
                    .Where(d => d.WalletId == walletId)
                    .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var deposites = await _context.Deposites
                    .Where(d => d.WalletId == walletId && d.Wallet!.Customer!.FirstName!.Contains(props.SearchString))
                    .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
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
                var totalAmount = await _context.Deposites
                .Where(d => d.WalletId == WalletId)
                .SumAsync(d => d.Amount);
                return totalAmount;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DepositeDto> updateAsync(int id, DepositeDto t)
        {
            try
            {
                var deposite = await _context.Deposites.FirstOrDefaultAsync(d => d.Id == id);
                if (deposite == null)
                {
                    throw new Exceptions.ServiceException(errorMessage);
                }
                var updatedDeposite = _mapper.Map<Deposite>(t);
                updatedDeposite.UpdatedAt = DateTime.UtcNow;
                _context.Entry(deposite).CurrentValues.SetValues(updatedDeposite);
                await _context.SaveChangesAsync();
                return _mapper.Map<DepositeDto>(updatedDeposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
