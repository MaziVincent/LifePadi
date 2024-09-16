using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class BaniCheckoutDto
    {
        public string? pay_va_step { get; set; } // default value is direct
        public string? country_code { get; set; } // default value is NG
        public string? pay_currency { get; set; } // NGN
        public string? holder_account_type { get; set; } // temporary or permanent
        public string? customer_ref { get; set; }
        public double? pay_amount { get; set; }
        public string? holder_legal_number { get; set; } //BVN
        public string? bank_name { get; set; }
        public string? pay_ext_ref { get; set; }
        public Custom_data? custom_data { get; set; }
        public int? pay_expiry { get; set; }

    }

    public class Custom_data
    {
        public int? customerId { get; set; }
        public string? voucherCode { get; set; }
        public int orderId { get; set; }
        public double amount { get; set; }
        public double totalAmount { get; set; }
        public double deliveryFee { get; set; }
        public DateTime? createdAt { get; set; }
    }
}