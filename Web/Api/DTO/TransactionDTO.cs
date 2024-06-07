using Api.Models;
using System.Numerics;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
    public class TransactionDto
=======
    public class TransactionDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
    public class TransactionDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
<<<<<<< HEAD
        public double TotalAmount { get; set; }
        public double AmountPaid { get; set; }
        public string? Status { get; set; }
        public bool? StatusBool { get; set; }
        public int? VoucherId { get; set; }
        public Voucher? Voucher { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }

        public DateTime? PaidAt { get; set; }
        public string? PaymentChannel {get; set;}
        public string? Type { get; set; }
        public double? DeliveryFee {get; set;}
       // public WalletDtoLite? Wallet { get; set; }

    }

    public class TransactionDtoLite
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public double TotalAmount { get; set; }
        public double AmountPaid { get; set; }
        public string? Status { get; set; }
        public string? Type { get; set; }
        public string? PaymentChannel { get; set; }
        public Wallet? Wallet { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class InitiatePaymentDto
    {
        public double Amount { get; set; }
        public double TotalAmount { get; set; }
        public double DeliveryFee { get; set; }
        public int OrderId { get; set; }
        public string? VoucherCode { get; set; }

    }

    public class PaymentDto
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public double TotalAmount { get; set; }
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
        public double amount { get; set; }
        public string? name { get; set; }
        public string? redirect_url { get; set; }
        public string? currency { get; set; }
        public Customer_Info? customer { get; set; }
        public Customizations? customizations { get; set; }
        public Meta? meta { get; set; }
    }

    public class Meta
    {
        public string? voucherCode { get; set; }
        public int orderId { get; set; }
        public double totalAmount { get; set; }
        public double deliveryFee { get; set; }
        public DateTime? createdAt { get; set; }

    }

    public class Customer_Info
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

    public class PaystackJsonResponse
    {
        public bool status { get; set; }
        public string? message { get; set; }
        public PaystackData? data { get; set; }
    }

    public class PaystackData
    {
        public string? authorization_url { get; set; }
        public string? access_code { get; set; }
        public string? reference { get; set; }
    }

    public class PaystackVerificationResponse
    {
        public bool status { get; set; }
        public string? message { get; set; }
        public PaystackVerificationData? data { get; set; }
    }

    public class PaystackVerificationData
    {
        public BigInteger id { get; set; }
        public string? reference { get; set; }
        public string? status { get; set; }
        public string? gateway_response { get; set; }
        public DateTime? paid_at { get; set; }
        public string? channel { get; set; }
        public string? currency { get; set; }
        public string? ip_address { get; set; }
        public int? amount { get; set; }
        public PaystackMetada? metadata { get; set; }
    }

    public class PaystackMetada
    {
        public string? voucherCode { get; set; }
        public int orderId { get; set; }
        public double totalAmount { get; set; }
        public double deliveryFee { get; set; }
        public double amount { get; set; }
        public DateTime? createdAt { get; set; }
    }
=======
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
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======

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
>>>>>>> 7f9ad44 (done with payment and voucher)
}
