namespace Api.Models
{
    public class Customer: User
    {
        public Customer(): base() { }
        public DateTime DOB { get; set; }
        public List<Order>? Orders { get; set; }
        public Wallet? Wallet { get; set; }
        public List<Favourite>? Favourites { get; set; }
        public List<CustomerVoucher>? CustomerVouchers { get; set; }
        public List<VoucherNotification>? VoucherNotifications { get; set; }
    }
}
