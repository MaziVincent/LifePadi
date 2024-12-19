using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.DTO;
using Api.Services;

namespace Api.Interfaces
{
    public interface IWalletDeposite
    {
        public Task<DepositeDto> createAsync(DepositeDto t);
        public Task<DepositeDto> getAsync(int id);
        public Task<PagedList<DepositeDto>> getAllAsync(SearchPaging props);
        public Task<DepositeDto> updateAsync(int id, DepositeDto t);
        public Task<string> deleteAsync(int id);
        public Task<PagedList<DepositeDto>> getByWalletId(int walletId, SearchPaging props);
        public Task<List<DepositeDto>> getByCustomerId(int customerId);
        public Task<List<DepositeDto>> getByStatus(string status);
        public Task<List<DepositeDto>> getByPaymentMethod(string paymentMethod);
        public Task<List<DepositeDto>> getByTransactionId(BigInteger transactionId);
        public Task<List<DepositeDto>> getByReferenceId(string referenceId);
        public Task<List<DepositeDto>> getByDate(DateTime date);
        public Task<List<DepositeDto>> getByDateRange(DateTime startDate, DateTime endDate);
        public Task<List<DepositeDto>> getByAmountRange(double startAmount, double endAmount);
        public Task<List<DepositeDto>> getByDateRangeForCustomer(int CustomerId, DateTime startDate, DateTime endDate);
        public Task<double> totalAmountByWalletId(int WalletId);
        public Task<object> customerTransactionStats(int customerId);
        public Task<object> initiateWalletDeposit(InitiateDepositeDto initiateDepositeDto);
        public Task<object> confirmWalletDeposit(string reference);
    }
}