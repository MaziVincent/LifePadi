using Api.DTO;
using System.Numerics;

namespace Api.Interfaces
{
    public interface ITransaction
    {
        public Task<IEnumerable<TransactionDto>> allAsync();
        public Task<TransactionDto> getAsync(int id);
        public Task<TransactionDto> updateAsync(TransactionDto transaction, int id);
        public Task<string> deleteAsync(int id);
        public Task<TransactionDto> createAsync(TransactionDto transaction);
        public Task<TransactionDto> getByPaymentId(BigInteger transactionId);
        public Task<DTO.Data> initiatePayment(InitiatePaymentDto initiatePayment);
        public Task<PaymentDetailsDto> confirmPayment(string status, string tx_ref, string transaction_id);
        public Task<int> totalNumberOfTransactions();
        public Task<int> totalNumberOfSuccessfulTransactions();
        public Task<int> totalNumberOfFailedTransactions();
        public Task<int> totalNumberOfPendingTransactions();
        public Task<object> transactionStats();
    }
}
