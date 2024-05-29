using System.Numerics;

namespace Api.DTO
{
    public class PaymentDetailsDTO
    {
        public DataDTO? Data { get; set; }
        public string? Status { get; set; }
    }

    public class DataDTO
    {
        public int Id { get; set; }
        public Double Amount { get; set; }
        public Double TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? Processor_Response { get; set; }
        public DTO.Customer? Customer { get; set; }
        public Meta? Meta { get; set; }
        public string? Tx_ref { get; set; }
        public BigInteger? TransactionId { get; set; }
        public string? Status { get; set; }
        public int? OrderId { get; set; }
    }
}
