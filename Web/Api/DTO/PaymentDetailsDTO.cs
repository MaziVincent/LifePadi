using System.Numerics;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
    public class PaymentDetailsDto
    {
        public DataDto? Data { get; set; }
        public string? Status { get; set; }
    }

    public class DataDto
=======
    public class PaymentDetailsDTO
=======
    public class PaymentDetailsDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public DataDto? Data { get; set; }
        public string? Status { get; set; }
    }

<<<<<<< HEAD
    public class DataDTO
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
    public class DataDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public Double Amount { get; set; }
        public Double TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? Processor_Response { get; set; }
<<<<<<< HEAD
        public Customer_Info? Customer { get; set; }
=======
        public DTO.Customer? Customer { get; set; }
>>>>>>> 7f9ad44 (done with payment and voucher)
        public Meta? Meta { get; set; }
        public string? Tx_ref { get; set; }
        public BigInteger? TransactionId { get; set; }
        public string? Status { get; set; }
        public int? OrderId { get; set; }
    }
}
