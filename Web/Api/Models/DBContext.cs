using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Rider> Riders { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrdersItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<VendorCategory> VendorCategories { get; set; }
        public DbSet<VendorReview> VendorReviews { get; set; }
        public DbSet<RiderReview> RiderReviews { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<Deposite> Deposites { get; set; }
        public DbSet<Withdrawal> Withdrawals { get; set; }
        public DbSet<WalletNotification> WalletNotifications { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        public DbSet<Logistic> Logistics { get; set; }
        public DbSet<CustomerVoucher> CustomerVouchers { get; set; }
        public DbSet<VoucherNotification> VoucherNotifications { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<CustomerSupport> CustomerSupports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Wallet)
                .WithOne(w => w.Customer)
                .HasForeignKey<Wallet>(w => w.CustomerId);
            
        }
    }
}
