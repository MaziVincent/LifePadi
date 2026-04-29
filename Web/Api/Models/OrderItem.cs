using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        [NotMapped]
        public Double _TotalAmount { get; set; } = 0;
        public Double TotalAmount
        {
            get
            {
                return _TotalAmount;
            }
            set
            {
                _TotalAmount = Quantity * Amount;
            }
        }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string? Name { get; set; }
        public double? Weight { get; set; }
        public string? Description { get; set; }
        public bool? IsFragile { get; set; }
        // --- Variant / Extras snapshot ---
        // ID of the chosen variant (if any) at order time. Kept as a plain int
        // so historical orders survive variant deletion.
        public int? SelectedVariantId { get; set; }
        public string? SelectedVariantName { get; set; }
        public double? SelectedVariantPrice { get; set; }
        // JSON snapshot of selected extras: [{"Id":1,"Name":"Cheese","Price":300}, ...]
        public string? SelectedExtrasJson { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public void SetQuantity(int quantity)
        {
            Quantity = quantity;
            _TotalAmount = Quantity * Amount; // Update TotalAmount when Quantity changes
        }

        public void SetAmount(double amount)
        {
            Amount = amount;
            _TotalAmount = Quantity * Amount; // Update TotalAmount when Amount changes
        }
    }
}
