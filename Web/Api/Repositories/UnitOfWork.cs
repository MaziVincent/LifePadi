using System.Collections.Concurrent;
using Api.Interfaces;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Api.Repositories
{
    /// <summary>
    /// Unit of Work implementation for managing transactions and repositories
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DBContext _context;
        private readonly ConcurrentDictionary<string, object> _repositories = new();
        private IDbContextTransaction? _transaction;

        // Lazy-loaded specific repositories
        private IRepository<User>? _users;
        private IRepository<Customer>? _customers;
        private IRepository<Vendor>? _vendors;
        private IRepository<Rider>? _riders;
        private IRepository<Admin>? _admins;
        private IRepository<Address>? _addresses;
        private IRepository<Category>? _categories;
        private IRepository<Delivery>? _deliveries;
        private IRepository<Order>? _orders;
        private IRepository<OrderItem>? _orderItems;
        private IRepository<Product>? _products;
        private IRepository<Service>? _services;
        private IRepository<Transaction>? _transactions;
        private IRepository<Voucher>? _vouchers;
        private IRepository<VendorCategory>? _vendorCategories;
        private IRepository<VendorReview>? _vendorReviews;
        private IRepository<RiderReview>? _riderReviews;
        private IRepository<ProductReview>? _productReviews;
        private IRepository<Wallet>? _wallets;
        private IRepository<Deposite>? _deposites;
        private IRepository<Withdrawal>? _withdrawals;
        private IRepository<WalletNotification>? _walletNotifications;
        private IRepository<Favourite>? _favourites;
        private IRepository<Logistic>? _logistics;
        private IRepository<CustomerVoucher>? _customerVouchers;
        private IRepository<VoucherNotification>? _voucherNotifications;
        private IRepository<Message>? _messages;
        private IRepository<CustomerSupport>? _customerSupports;

        public UnitOfWork(DBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IRepository<T> Repository<T>() where T : class
        {
            var typeName = typeof(T).Name;
            return (IRepository<T>)_repositories.GetOrAdd(typeName, _ => new Repository<T>(_context));
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        // Specific repository properties with lazy loading
        public IRepository<User> Users => _users ??= new Repository<User>(_context);
        public IRepository<Customer> Customers => _customers ??= new Repository<Customer>(_context);
        public IRepository<Vendor> Vendors => _vendors ??= new Repository<Vendor>(_context);
        public IRepository<Rider> Riders => _riders ??= new Repository<Rider>(_context);
        public IRepository<Admin> Admins => _admins ??= new Repository<Admin>(_context);
        public IRepository<Address> Addresses => _addresses ??= new Repository<Address>(_context);
        public IRepository<Category> Categories => _categories ??= new Repository<Category>(_context);
        public IRepository<Delivery> Deliveries => _deliveries ??= new Repository<Delivery>(_context);
        public IRepository<Order> Orders => _orders ??= new Repository<Order>(_context);
        public IRepository<OrderItem> OrderItems => _orderItems ??= new Repository<OrderItem>(_context);
        public IRepository<Product> Products => _products ??= new Repository<Product>(_context);
        public IRepository<Service> Services => _services ??= new Repository<Service>(_context);
        public IRepository<Transaction> Transactions => _transactions ??= new Repository<Transaction>(_context);
        public IRepository<Voucher> Vouchers => _vouchers ??= new Repository<Voucher>(_context);
        public IRepository<VendorCategory> VendorCategories => _vendorCategories ??= new Repository<VendorCategory>(_context);
        public IRepository<VendorReview> VendorReviews => _vendorReviews ??= new Repository<VendorReview>(_context);
        public IRepository<RiderReview> RiderReviews => _riderReviews ??= new Repository<RiderReview>(_context);
        public IRepository<ProductReview> ProductReviews => _productReviews ??= new Repository<ProductReview>(_context);
        public IRepository<Wallet> Wallets => _wallets ??= new Repository<Wallet>(_context);
        public IRepository<Deposite> Deposites => _deposites ??= new Repository<Deposite>(_context);
        public IRepository<Withdrawal> Withdrawals => _withdrawals ??= new Repository<Withdrawal>(_context);
        public IRepository<WalletNotification> WalletNotifications => _walletNotifications ??= new Repository<WalletNotification>(_context);
        public IRepository<Favourite> Favourites => _favourites ??= new Repository<Favourite>(_context);
        public IRepository<Logistic> Logistics => _logistics ??= new Repository<Logistic>(_context);
        public IRepository<CustomerVoucher> CustomerVouchers => _customerVouchers ??= new Repository<CustomerVoucher>(_context);
        public IRepository<VoucherNotification> VoucherNotifications => _voucherNotifications ??= new Repository<VoucherNotification>(_context);
        public IRepository<Message> Messages => _messages ??= new Repository<Message>(_context);
        public IRepository<CustomerSupport> CustomerSupports => _customerSupports ??= new Repository<CustomerSupport>(_context);

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }
    }
}
