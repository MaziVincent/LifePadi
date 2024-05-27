using Api.DTO;
using System.Numerics;

namespace Api.Interfaces
{
    public interface ITransaction
    {
        public Task<IEnumerable<TransactionDTO>> allAsync();
        public Task<TransactionDTO> getAsync(int id);
        public Task<TransactionDTO> updateAsync(TransactionDTO transaction, int id);
        public Task<string> deleteAsync(int id);
        public Task<TransactionDTO> createAsync(TransactionDTO transaction);
        public Task<TransactionDTO> getByPaymentId(BigInteger transactionId);
        public Task<DTO.Data> initiatePayment(InitiatePaymentDTO initiatePayment);
        public Task<PaymentDetailsDTO> confirmPayment(string status, string tx_ref, string transaction_id);
    }
}
