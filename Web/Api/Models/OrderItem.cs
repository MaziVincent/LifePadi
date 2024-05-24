using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        [NotMapped]
        public Double _TotalAmount { get; set; } = 0;
        public Double TotalAmount
        {
            get
            {
=======
        [NotMapped]
        public Double _TotalAmount { get; set; } = 0;
        public Double TotalAmount { 
            get {
>>>>>>> 4641615 (finished with delivery service and controller)
                return _TotalAmount;
            }
            set
            {
                _TotalAmount = Quantity * Amount;
            }
        }
<<<<<<< HEAD
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
>>>>>>> 4641615 (finished with delivery service and controller)
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string? Name { get; set; }
        public double? Weight { get; set; }
        public string? Description { get; set; }
        public bool? IsFragile { get; set; }
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
