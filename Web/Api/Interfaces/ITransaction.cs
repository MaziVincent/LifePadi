using Api.DTO;
using System.Numerics;

namespace Api.Interfaces
{
    public interface ITransaction
    {
<<<<<<< HEAD
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
        public Task<TransactionDTO> getAsync(int id);
        public Task<TransactionDTO> updateAsync(TransactionDTO transaction, int id);
        public Task<string> deleteAsync(int id);
        public Task<TransactionDTO> createAsync(TransactionDTO transaction);
        public Task<TransactionDTO> getByPaymentId(BigInteger transactionId);
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<DTO.Data> initiatePayment(InitiatePaymentDTO initiatePayment);
        public Task<PaymentDetailsDTO> confirmPayment(string status, string tx_ref, string transaction_id);
<<<<<<< HEAD
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
=======
        public Task<IEnumerable<TransactionDto>> allAsync();
        public Task<TransactionDto> getAsync(int id);
        public Task<TransactionDto> updateAsync(TransactionDto transaction, int id);
        public Task<string> deleteAsync(int id);
        public Task<TransactionDto> createAsync(TransactionDto transaction);
        public Task<TransactionDto> getByPaymentId(BigInteger transactionId);
        public Task<DTO.Data> initiatePayment(InitiatePaymentDto initiatePayment);
<<<<<<< HEAD
        public Task<PaymentDetailsDto> confirmPayment(string status, string tx_ref, string transaction_id);
>>>>>>> 836ec36 (changed all DTO to Dto)
=======
        public Task<PaymentDetailsDto> confirmPayment(AfterPayment transactionInfo);
>>>>>>> e848b7b (Payment Response)
        public Task<int> totalNumberOfTransactions();
        public Task<int> totalNumberOfSuccessfulTransactions();
        public Task<int> totalNumberOfFailedTransactions();
        public Task<int> totalNumberOfPendingTransactions();
        public Task<object> transactionStats();
>>>>>>> 98415b4 (done with dashboard)
    }
}
