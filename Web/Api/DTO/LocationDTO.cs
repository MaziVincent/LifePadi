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
}