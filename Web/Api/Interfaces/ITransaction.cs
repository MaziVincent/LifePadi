using Api.DTO;
using System.Numerics;

namespace Api.Interfaces
{
    public interface ITransaction
    {
<<<<<<< HEAD
        public Task<IEnumerable<TransactionDto>> AllAsync();
        public Task<TransactionDto> GetAsync(int id);
        public Task<TransactionDto> UpdateAsync(TransactionDto transaction, int id);
        public Task<string> DeleteAsync(int id);
        public Task<TransactionDto> CreateAsync(TransactionDto transaction);
        public Task<TransactionDto> GetByPaymentId(BigInteger transactionId);
        public Task<DTO.Data> InitiatePayment(InitiatePaymentDto initiatePayment);
        public Task<PaymentDetailsDto> ConfirmPayment(AfterPayment transactionInfo);
        public Task<int> TotalNumberOfTransactions();
        public Task<int> TotalNumberOfSuccessfulTransactions();
        public Task<int> TotalNumberOfFailedTransactions();
        public Task<int> TotalNumberOfPendingTransactions();
        public Task<object> TransactionStats();
        public Task<object> BaniCheckout(InitiatePaymentDto initiatePaymentDto);
        public Task<object> MobilePaystackCheckout(InitiatePaymentDto initiatePaymentDto);
        public Task<object> PaystackCheckout(InitiatePaymentDto initiatePaymentDto);
        public Task<object> PaystackVerifyPayment(string reference);
        public Task<TransactionDto> GetTransactionByOrderId(int orderId);
=======
        public Task<IEnumerable<TransactionDTO>> allAsync();
        public Task<TransactionDTO> getAsync();
        public Task<TransactionDTO> updateAsync(TransactionDTO transaction, int id);
        public Task<string> deleteAsync(int id);
        public Task<TransactionDTO> createAsync(TransactionDTO transaction);
        public Task<TransactionDTO> getByPaymentId(BigInteger transactionId);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
