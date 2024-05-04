using Api.DTO;
using Api.Models;
using AutoMapper;

namespace Api.Services
{
    public class AutoMapperProfile : Profile

    {
        public AutoMapperProfile() {
            CreateMap<UserDTO, User>();
            CreateMap<Admin, UserDTO>();
            CreateMap<AuthUserDTO, Admin>();
            CreateMap<CustomerDTO, Customer>();
            CreateMap<AuthUserDTO, User>();
            CreateMap<RiderDTO, Rider>();
            CreateMap<VendorDTO, Vendor>();
            CreateMap<OrderDTO, Order>();
            CreateMap<ProductDTO, Product>();
            CreateMap<ServiceDTO, Service>();
            CreateMap<CategoryDTO, Category>();
            CreateMap<OrderItemDTO, OrderItem>();
            CreateMap<TransactionDTO, Transaction>();
        }
    }
}
