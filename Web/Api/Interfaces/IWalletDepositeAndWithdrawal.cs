using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.DTO;
using Api.Services;

namespace Api.Interfaces
{
    public interface IWalletDepositeAndWithdrawal<T>
    {
        public Task<T> createAsync(T t);
        public Task<T> getAsync(int id);
        public Task<PagedList<T>> getAllAsync(SearchPaging props);
        public Task<T> updateAsync(int id, T t);
        public Task<string> deleteAsync(int id);
        public Task<PagedList<T>> getByWalletId(int walletId, SearchPaging props);
        public Task<List<T>> getByCustomerId(int customerId);
        public Task<List<T>> getByStatus(string status);
        public Task<List<T>> getByPaymentMethod(string paymentMethod);
        public Task<List<T>> getByTransactionId(BigInteger transactionId);
        public Task<List<T>> getByReferenceId(string referenceId);
        public Task<List<T>> getByDate(DateTime date);
        public Task<List<T>> getByDateRange(DateTime startDate, DateTime endDate);
        public Task<List<T>> getByAmountRange(double startAmount, double endAmount);
        public Task<List<T>> getByDateRangeForCustomer(int CustomerId, DateTime startDate, DateTime endDate);
        public Task<double> totalAmountByWalletId(int WalletId);
        public Task<object> customerTransactionStats(int customerId);
    }
}
