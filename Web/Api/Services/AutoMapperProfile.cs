using Api.DTO;
using Api.Models;
using AutoMapper;

namespace Api.Services
{
    public class AutoMapperProfile : Profile

    {
        public AutoMapperProfile() {
            //user
            CreateMap<UserDTOLite, User>();
            CreateMap<User, UserDTOLite>();
            CreateMap<UserDTO, Admin>();
            CreateMap<Admin, UserDTO>();
            CreateMap<Admin, AuthUserDTO>();
            CreateMap<AuthUserDTO, User>();
            CreateMap<GenTokenDTO, AuthUserDTO>();

            //Customer
            CreateMap<CustomerDTO, Customer>();
            CreateMap<Customer, CustomerDTOLite>();
            CreateMap<Customer, AuthUserDTO>();

            //Rider
            CreateMap<RiderDTO, Rider>();
            CreateMap<Rider, GetRiderDTO>();
            CreateMap<Rider, AuthRiderDTO>();
            CreateMap<CreateRiderDTO, Rider>();
            CreateMap<GetRiderDTO, Rider>();
            CreateMap<Rider, RiderDTOLite>();


            //Vendor
            CreateMap<VendorDTO, Vendor>();
            CreateMap<Vendor, VendorDTOLite>();
            CreateMap<AuthVendorDTO, Vendor>();
            CreateMap<Vendor, AuthUserDTO>();
            CreateMap<Vendor, AuthVendorDTOLite>();
            CreateMap<Vendor, VendorDTO>();

            //Order
            CreateMap<OrderDTO, Order>();
            CreateMap<Order, OrderDTOLite>();
            CreateMap<Order, OrderDTO>();

            //Product
            CreateMap<ProductDTO, Product>();
            CreateMap<Product, ProductDTOLite>();
            CreateMap<Product, ProductDTO>();
            CreateMap<CreateProductDTO, Product>();

            //Service
            CreateMap<ServiceDTO, Service>();
            CreateMap<Service, ServiceDTO>();
            CreateMap<Service, ServiceDTOLite>();

            //Category
            CreateMap<CategoryDTO, Category>();
            CreateMap<Category, CategoryDTO>();
            CreateMap<Category, CategoryDTOLite>();
            CreateMap<CategoryDTOLite, Category>();

            //OrderItem
            CreateMap<OrderItemDTO, OrderItem>();
            CreateMap<OrderItem, OrderItemDTOLite>();
            CreateMap<OrderItem, OrderItemDTO>();

            //Transaction
            CreateMap<TransactionDTO, Transaction>();

            //Adress
            CreateMap<Address, AddressDTOLite>();
            CreateMap<AddressDTO, Address>();
            CreateMap<Address, AddressDTO>();

            //Delivry
            CreateMap<Delivery, DeliveryDTO>();
            CreateMap<Delivery, DeliveryDTOLite>();
            CreateMap<DeliveryDTO, Delivery>();
        }
    }
}
