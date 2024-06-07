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
        }
    }
}
