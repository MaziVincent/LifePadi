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
        public Task<PaymentDetailsDto> confirmPayment(AfterPayment transactionInfo);
        public Task<int> totalNumberOfTransactions();
        public Task<int> totalNumberOfSuccessfulTransactions();
        public Task<int> totalNumberOfFailedTransactions();
        public Task<int> totalNumberOfPendingTransactions();
        public Task<object> transactionStats();
    }
}
