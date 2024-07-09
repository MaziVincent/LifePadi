using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
    public class RiderDto
    {
        public int? Id { get; set; }
        public string?  FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
=======
    public class RiderDTO
    {
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public int? Id { get; set; }
        public string?  FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
>>>>>>> 28d4101 (finished with rider and order)
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public bool? IsVerified { get; set; }
        public string? Password { get; set; }
        public List<OrderDtoLite>? Orders { get; set; }
        public List<RiderReview>? RiderReviews { get; set; }
    }

    public class GetRiderDto
=======
        public bool? IsVerified { get; set; }
        public string? Password { get; set; }
        public List<OrderDtoLite>? Orders { get; set; }
    }

<<<<<<< HEAD
    public class GetRiderDTO
>>>>>>> 28d4101 (finished with rider and order)
=======
    public class GetRiderDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
<<<<<<< HEAD
=======
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
=======
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 28d4101 (finished with rider and order)
        public List<OrderDTOLite>? Orders { get; set; }
=======
        public List<OrderDtoLite>? Orders { get; set; }
>>>>>>> 836ec36 (changed all DTO to Dto)
    }

    public class RiderDtoLite
    {
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
>>>>>>> 28d4101 (finished with rider and order)
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public bool? IsVerified { get; set; }
        public List<DeliveryDtoLite>? Deliveries { get; set; }
        public List<RiderReview>? RiderReviews { get; set; }
=======
        public List<DeliveryDtoLite>? Deliveries { get; set; }
>>>>>>> a2698f4 (Finishing touches on the admin portal)
    }

    public class RiderDtoLite
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
=======
        public bool? IsVerified { get; set; }
>>>>>>> 28d4101 (finished with rider and order)
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a2698f4 (Finishing touches on the admin portal)
    public class CreateRiderDto
=======

<<<<<<< HEAD
    public class CreateRiderDTO
>>>>>>> 28d4101 (finished with rider and order)
=======
    public class CreateRiderDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public IFormFile? IdentityImg { get; set; }
        public string? EmergencyContact { get; set; }
        public string? Password { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public List<OrderDtoLite>? Orders { get; set; }
    }

    public class AuthRiderDto : AuthUserDto
    {
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsVerified { get; set; }
        public bool? IsActive {get; set;}
    }
=======
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public List<OrderDTOLite>? Orders { get; set; }
=======
        public List<OrderDtoLite>? Orders { get; set; }
>>>>>>> 836ec36 (changed all DTO to Dto)
    }

    public class AuthRiderDto : AuthUserDto
    {
        public bool? IsVerified { get; set; }
    }
>>>>>>> 28d4101 (finished with rider and order)
}
