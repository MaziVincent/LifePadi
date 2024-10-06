using Api.DTO;
using Api.Models;
using AutoMapper;
using Customer = Api.Models.Customer;

namespace Api.Services
{
    public class AutoMapperProfile : Profile

    {
        public AutoMapperProfile() {
            //user
            CreateMap<UserDtoLite, User>();
            CreateMap<User, UserDtoLite>();
            CreateMap<UserDto, Admin>();
            CreateMap<Admin, UserDto>();
            CreateMap<Admin, AuthUserDto>();
            CreateMap<AuthUserDto, User>();
            CreateMap<GenTokenDto, AuthUserDto>();

            //Customer
            CreateMap<CustomerDto, Customer>();
            CreateMap<Customer, CustomerDtoLite>();
            CreateMap<Customer, AuthUserDto>();

            //Rider
            CreateMap<RiderDto, Rider>();
            CreateMap<Rider, GetRiderDto>();
            CreateMap<Rider, AuthRiderDto>();
            CreateMap<CreateRiderDto, Rider>();
            CreateMap<GetRiderDto, Rider>();
            CreateMap<Rider, RiderDtoLite>();


            //Vendor
            CreateMap<VendorDto, Vendor>();
            CreateMap<Vendor, VendorDtoLite>();
            CreateMap<AuthVendorDto, Vendor>();
            CreateMap<Vendor, AuthUserDto>();
            CreateMap<Vendor, AuthVendorDtoLite>();
            CreateMap<Vendor, VendorDto>();

            //Order
            CreateMap<OrderDto, Order>();
            CreateMap<Order, OrderDtoLite>();
            CreateMap<Order, OrderDto>();

            //Product
            CreateMap<ProductDto, Product>();
            CreateMap<Product, ProductDtoLite>();
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();

            //Service
            CreateMap<ServiceDto, Service>();
            CreateMap<Service, ServiceDto>();
            CreateMap<Service, ServiceDtoLite>();

            //Category
            CreateMap<CategoryDto, Category>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Category, CategoryDtoLite>();
            CreateMap<CategoryDtoLite, Category>();

            //OrderItem
            CreateMap<OrderItemDto, OrderItem>();
            CreateMap<OrderItem, OrderItemDtoLite>();
            CreateMap<OrderItem, OrderItemDto>();
            CreateMap<OrderItem, OrderItemDtoLite>();

            //Transaction
            CreateMap<TransactionDto, Transaction>();
            CreateMap<Transaction, TransactionDto>();

            //Adress
            CreateMap<Address, AddressDtoLite>();
            CreateMap<AddressDto, Address>();
            CreateMap<Address, AddressDto>();

            //Delivry
            CreateMap<Delivery, DeliveryDto>();
            CreateMap<Delivery, DeliveryDtoLite>();
            CreateMap<DeliveryDto, Delivery>();
            CreateMap<DeliveryDtoLite, Delivery>();
            CreateMap<Delivery, CreateDeliveryDto>();

            //Voucher
            CreateMap<Voucher, VoucherDto>();
            CreateMap<VoucherDto, Voucher>();

            //VendorCategory
            CreateMap<VendorCategory, VendorCategoryDto>();
            CreateMap<VendorCategoryDto, VendorCategory>();

            //ProductReview
            CreateMap<ProductReview, ProductReviewDto>();
            CreateMap<ProductReviewDto, ProductReview>();

            //VendorReview
            CreateMap<VendorReview, VendorReviewDto>();
            CreateMap<VendorReviewDto, VendorReview>();

            //RiderReview
            CreateMap<RiderReview, RiderReviewDto>();
            CreateMap<RiderReviewDto, RiderReview>();

            //Wallet
            CreateMap<Wallet, WalletDto>();
            CreateMap<WalletDto, Wallet>();

            //Deposite
            CreateMap<Deposite, DepositeDto>();
            CreateMap<DepositeDto, Deposite>();

            //Withdrawal
            CreateMap<Withdrawal, WithdrawalDto>();
            CreateMap<WithdrawalDto, Withdrawal>();

            //walletNotification
            CreateMap<WalletNotification, WalletNotificationDto>();
            CreateMap<WalletNotificationDto, WalletNotification>();

            //Favourite
            CreateMap<Favourite, FavouriteDto>();
            CreateMap<FavouriteDto, Favourite>();

            //Logistics
            CreateMap<Logistic, LogisticDto>();
            CreateMap<LogisticDto, Logistic>();

            //CustomerVoucher
            CreateMap<CustomerVoucher, CustomerVoucherDto>();
            CreateMap<CustomerVoucherDto, CustomerVoucher>();

            //VoucherNotification
            CreateMap<VoucherNotification, VoucherNotificationDto>();
            CreateMap<VoucherNotificationDto, VoucherNotification>();
        }
    }
}
