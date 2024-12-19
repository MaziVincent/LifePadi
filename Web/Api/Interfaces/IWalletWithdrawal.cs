using System.Numerics;
using Api.DTO;
using Api.Services;

namespace Api.Interfaces
{
    public interface IWalletWithdrawal
    {
        public Task<WithdrawalDto> createAsync(WithdrawalDto t);
        public Task<WithdrawalDto> getAsync(int id);
        public Task<PagedList<WithdrawalDto>> getAllAsync(SearchPaging props);
        public Task<WithdrawalDto> updateAsync(int id, WithdrawalDto t);
        public Task<string> deleteAsync(int id);
        public Task<PagedList<WithdrawalDto>> getByWalletId(int walletId, SearchPaging props);
        public Task<List<WithdrawalDto>> getByCustomerId(int customerId);
        public Task<List<WithdrawalDto>> getByStatus(string status);
        public Task<List<WithdrawalDto>> getByPaymentMethod(string paymentMethod);
        public Task<List<WithdrawalDto>> getByTransactionId(BigInteger transactionId);
        public Task<List<WithdrawalDto>> getByReferenceId(string referenceId);
        public Task<List<WithdrawalDto>> getByDate(DateTime date);
        public Task<List<WithdrawalDto>> getByDateRange(DateTime startDate, DateTime endDate);
        public Task<List<WithdrawalDto>> getByAmountRange(double startAmount, double endAmount);
        public Task<List<WithdrawalDto>> getByDateRangeForCustomer(int CustomerId, DateTime startDate, DateTime endDate);
        public Task<double> totalAmountByWalletId(int WalletId);
        public Task<object> customerTransactionStats(int customerId);
    }
}
