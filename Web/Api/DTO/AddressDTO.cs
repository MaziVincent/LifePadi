<<<<<<< HEAD
<<<<<<< HEAD
﻿using Api.Models;

namespace Api.DTO
{
    public class AddressDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? LocalGovt { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public bool? DefaultAddress {get; set; }
        public bool? IsActive { get; set; }
        public int UserId { get; set; }
        public UserDtoLite? User { get; set; }
    }

    public class AddressDtoLite
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? LocalGovt { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public bool? DefaultAddress {get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int UserId { get; set;}
    }

    public class DefaultAddressDto{
        public int AddressId {get; set;}
        public int CustomerId {get; set;}
=======
﻿namespace Api.DTO
=======
﻿using Api.Models;

namespace Api.DTO
>>>>>>> ee48634 (done with service, category and product controllers.)
{
    public class AddressDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public int CustomerId { get; set; }
        public CustomerDTOLite? Customer { get; set; }
    }

    public class AddressDTOLite
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public int CustomerId { get; set;}
>>>>>>> ee48634 (done with service, category and product controllers.)
    }
}
