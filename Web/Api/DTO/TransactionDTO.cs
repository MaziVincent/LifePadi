using Api.Models;
using System.Numerics;

namespace Api.DTO
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public Double TotalAmount { get; set; }
        public Double AmountPaid { get; set; }
        public string? Status { get; set; }
        public int? VoucherId { get; set; }
        public Voucher? Voucher { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }
    }

    public class TransactionDtoLite
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public Double TotalAmount { get; set; }
        public Double AmountPaid { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class InitiatePaymentDto
    {
        public Double Amount { get; set; }
        public Double? TotalAmount { get; set; }
        public Double DeliveryFee { get; set; }
        public int OrderId { get; set; }
        public string? VoucherCode { get; set; }

    }

    public class PaymentDto
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public Double TotalAmount { get; set; }
        public string? Status { get; set; }
        public int? VoucherId { get; set; }
        public VoucherDto? Voucher { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class MakePaymentDetails
    {
        public string? tx_ref { get; set; }
        public Double amount { get; set; }
        public string? name { get; set; }
        public string? redirect_url { get; set; }
        public string? currency { get; set; }
        public Customer? customer { get; set; }
        public Customizations? customizations { get; set; }
        public Meta? meta {  get; set; }
    }

    public class Meta
    {
        public string? voucherCode { get; set; }
        public int orderId { get; set; }
        public Double totalAmount { get; set; }
        public Double deliveryFee { get; set; }
        public DateTime? createdAt { get; set; }

    }

    public class Customer
    {
        public string? email { get; set; }
        public string? name { get; set; }
        public string? phone_number { get; set; }
    }


    public class Customizations
    {
        public string? title { get; set; }
        public string? description { get; set; }
        public string? logo { get; set; }
    }

    public class JsonResponse
    {
        public string? status { get; set; }
        public string? Message { get; set; }
        public Data? data { get; set; }
    }

    public class Data
    {
        public string? link { get; set; }
    }

    public class AfterPayment
    {
        public string? status { get; set; }
        public string? tx_ref { get; set; }
        public string? transaction_id { get; set; }
    }
}
