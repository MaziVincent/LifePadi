using Api.Models;

namespace Api.Interfaces
{
    /// <summary>
    /// Unit of Work pattern interface for managing transactions and repositories
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Gets repository for the specified entity type
        /// </summary>
        /// <typeparam name="T">Entity type</typeparam>
        /// <returns>Repository instance</returns>
        IRepository<T> Repository<T>() where T : class;

        /// <summary>
        /// Saves all pending changes to the database
        /// </summary>
        /// <returns>Number of affected records</returns>
        Task<int> SaveChangesAsync();

        /// <summary>
        /// Begins a new database transaction
        /// </summary>
        Task BeginTransactionAsync();

        /// <summary>
        /// Commits the current transaction
        /// </summary>
        Task CommitTransactionAsync();

        /// <summary>
        /// Rolls back the current transaction
        /// </summary>
        Task RollbackTransactionAsync();

        // Specific repositories for commonly used entities
        IRepository<User> Users { get; }
        IRepository<Customer> Customers { get; }
        IRepository<Vendor> Vendors { get; }
        IRepository<Rider> Riders { get; }
        IRepository<Admin> Admins { get; }
        IRepository<Address> Addresses { get; }
        IRepository<Category> Categories { get; }
        IRepository<Delivery> Deliveries { get; }
        IRepository<Order> Orders { get; }
        IRepository<OrderItem> OrderItems { get; }
        IRepository<Product> Products { get; }
        IRepository<Service> Services { get; }
        IRepository<Transaction> Transactions { get; }
        IRepository<Voucher> Vouchers { get; }
        IRepository<VendorCategory> VendorCategories { get; }
        IRepository<VendorReview> VendorReviews { get; }
        IRepository<RiderReview> RiderReviews { get; }
        IRepository<ProductReview> ProductReviews { get; }
        IRepository<Wallet> Wallets { get; }
        IRepository<Deposite> Deposites { get; }
        IRepository<Withdrawal> Withdrawals { get; }
        IRepository<WalletNotification> WalletNotifications { get; }
        IRepository<Favourite> Favourites { get; }
        IRepository<Logistic> Logistics { get; }
        IRepository<CustomerVoucher> CustomerVouchers { get; }
        IRepository<VoucherNotification> VoucherNotifications { get; }
        IRepository<Message> Messages { get; }
        IRepository<CustomerSupport> CustomerSupports { get; }
    }
}
