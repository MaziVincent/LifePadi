using Api.DTO;
using Api.Models;
using AutoMapper;
<<<<<<< HEAD
<<<<<<< HEAD
using Customer = Api.Models.Customer;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
using Customer = Api.Models.Customer;
>>>>>>> 7f9ad44 (done with payment and voucher)

namespace Api.Services
{
    public class AutoMapperProfile : Profile

    {
<<<<<<< HEAD
        public AutoMapperProfile()
        {
            //user
            CreateMap<UserDtoLite, User>();
            CreateMap<User, UserDtoLite>();
            CreateMap<UserDto, Admin>();
            CreateMap<Admin, UserDto>();
            CreateMap<Admin, AuthUserDto>();
            CreateMap<AuthUserDto, User>();
            CreateMap<GenTokenDto, AuthUserDto>();
            CreateMap<User, UserDtoLiteMessage>();

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
            CreateMap<Order, SingleOrderDto>();
            CreateMap<SingleOrderDto, Order>();
            CreateMap<SingleOrderDto, OrderDto>();
            CreateMap<OrderDto, SingleOrderDto>();

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
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<Category, CreateCategoryDto>();

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
            CreateMap<Wallet, WalletDtoLite>();
            CreateMap<WalletDto, Wallet>();
            CreateMap<WalletDtoLite, Wallet>();

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

            //Message
            CreateMap<Message, MessageDto>();
            CreateMap<MessageDto, Message>();
=======
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
<<<<<<< HEAD
            CreateMap<TransactionDTO, Transaction>();
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
=======
            CreateMap<Transaction, TransactionDTO>();
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            CreateMap<TransactionDto, Transaction>();
            CreateMap<Transaction, TransactionDto>();
>>>>>>> 836ec36 (changed all DTO to Dto)

            //Adress
            CreateMap<Address, AddressDTOLite>();
            CreateMap<AddressDTO, Address>();
            CreateMap<Address, AddressDTO>();
<<<<<<< HEAD
>>>>>>> ee48634 (done with service, category and product controllers.)
=======

            //Delivry
<<<<<<< HEAD
            CreateMap<Delivery, DeliveryDTO>();
            CreateMap<Delivery, DeliveryDTOLite>();
            CreateMap<DeliveryDTO, Delivery>();
<<<<<<< HEAD
>>>>>>> 28d4101 (finished with rider and order)
=======
            CreateMap<DeliveryDTOLite, Delivery>();
<<<<<<< HEAD
>>>>>>> 4641615 (finished with delivery service and controller)
=======
            CreateMap<Delivery, CreateDeliveryDTO>();

            //Voucher
            CreateMap<Voucher, VoucherDTO>();
            CreateMap<VoucherDTO, Voucher>();
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            CreateMap<Delivery, DeliveryDto>();
            CreateMap<Delivery, DeliveryDtoLite>();
            CreateMap<DeliveryDto, Delivery>();
            CreateMap<DeliveryDtoLite, Delivery>();
            CreateMap<Delivery, CreateDeliveryDto>();

            //Voucher
            CreateMap<Voucher, VoucherDto>();
            CreateMap<VoucherDto, Voucher>();
>>>>>>> 836ec36 (changed all DTO to Dto)
        }
    }
}
