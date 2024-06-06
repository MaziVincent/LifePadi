namespace Api.Models
{
    public class Customer: User
    {
        public Customer(): base() { }
        public DateTime DOB { get; set; }
        public List<Order>? Orders { get; set; }

    }
}
