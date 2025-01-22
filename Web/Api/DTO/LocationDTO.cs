using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class LocationDTO
    {
        public string? CurrentAddress {get; set;}
        public string? Longitude {get; set;}
        public string? Latitude {get; set;}
        
    }
    public class Coordinates
    {
        public double? Longitude {get; set;}
        public double? Latitude {get; set;}
    }

    public class Distance{

        public string? Origin {get; set;}  
        public string? Destination {get; set;}  

    }

    public class DistanceRequest
    {

        public double OriginLatitude { get; set; }
        public double OriginLongitude { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }

    }

    public class RiderLocation
    {
        public string? RiderId { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
    }

    public class PlaceDTO {

        public string? OriginPlaceId { get; set; }
        public string? DestinationPlaceId { get; set; }
    }
}