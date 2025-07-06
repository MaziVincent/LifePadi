using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Api.DTO;
using Api.Helpers;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoogleMapsController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private IConfiguration _config;

        public GoogleMapsController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _config = configuration;
        }



        [HttpGet("address")]
        public async Task<IActionResult> GetAddressFromCoordinates([FromQuery] Coordinates coordinates)
        {
            var longitude = coordinates.Longitude;
            var latitude = coordinates.Latitude;

            if (longitude == null || latitude == null)
            {
                return BadRequest("Longitude and Latitude must be provided.");
            }

            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value; // Replace with your actual API key
            var requestUri = $"https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={apiKey}";

            var response = await _httpClient.GetAsync(requestUri);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(content);

            if (json["status"]!.ToString() != "OK")
            {
                return BadRequest(json["status"]!.ToString());
            }

            var details = json["results"]?.FirstOrDefault();
            var addressComponents = details?["address_components"];

            if (addressComponents == null)
            {
                return NotFound("Address components are missing from the response.");
            }

            // Helper function to extract a specific address component by type
            string? GetAddressComponent(string type)
            {
                return addressComponents?
                    .FirstOrDefault(c => c["types"]?.Any(t => t.ToString() == type) == true)?["long_name"]
                    ?.ToString();
            }

            // Extract properties
            var formattedAddress = new
            {
                Name = details?["formatted_address"]?.ToString(),
                Town = GetAddressComponent("sublocality_level_1"),
                City = GetAddressComponent("locality"),
                LocalGovt = GetAddressComponent("administrative_area_level_2"),
                State = GetAddressComponent("administrative_area_level_1"),
                PostalCode = GetAddressComponent("postal_code"),
                Longitude = details?["geometry"]?["location"]?["lng"],
                Latitude = details?["geometry"]?["location"]?["lat"]
            };
            return Ok(formattedAddress);
        }

        [HttpGet("coordinates")]
        public async Task<IActionResult> GetCoordinatesFromAddress(string address)
        {
            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value; // Replace with your actual API key
            var requestUri = $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={apiKey}";

            var response = await _httpClient.GetAsync(requestUri);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(content);

            if (json["status"]!.ToString() != "OK")
            {
                return BadRequest(json["status"]!.ToString());
            }

            var location = json["results"]?[0]?["geometry"]?["location"];
            var latitude = location?["lat"]?.ToObject<double>();
            var longitude = location?["lng"]?.ToObject<double>();

            return Ok(new { latitude, longitude });
        }

         [HttpGet("distancewithaddress")]
        public async Task<IActionResult> GetDistance([FromQuery] Distance _distance){
        
            var origin = _distance.Origin;
            var destination = _distance.Destination;
            
            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value; // Replace with your actual API key
           string requestUri = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+destination+"&key="+apiKey;

            var response = await _httpClient.GetAsync(requestUri);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(content);

            if (json["status"]!.ToString() != "OK")
            {
                return BadRequest(json["status"]!.ToString());
            }

            var distance = json["rows"]?[0]?["elements"]?[0]?["distance"]?["value"];
            var duration = json["rows"]?[0]?["elements"]?[0]?["duration"]?["text"];

            return Ok(new { distance, duration, json });
        }


        [HttpGet("autocomplete")]
        public async Task<IActionResult> GetAutocompleteSuggestions(string input)
        {
            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value;
            var requestUri = $"https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}&components=country:ng&key={apiKey}";
            var response = await _httpClient.GetAsync(requestUri);

            if (!response.IsSuccessStatusCode)
            {
            return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var result = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(result);

            if (json["status"]!.ToString() != "OK")
            {
            return BadRequest(json["status"]!.ToString());
            }

            var suggestions = json["predictions"]?.Select(p => new
            {
            description = p["description"]?.ToString(),
            placeId = p["place_id"]?.ToString()
            });

            return Ok(suggestions);
        }

        [HttpGet("distancewithplaceid")]
        public async Task<IActionResult> CalculateDistance([FromQuery] Distance _distance)
        {
            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value;

            // Distance Matrix API URL with place IDs
            var requestUri = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:{_distance.Origin}&destinations=place_id:{_distance.Destination}&key={apiKey}";
            var response = await _httpClient.GetAsync(requestUri);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var result = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(result);

            if (json["status"]?.ToString() != "OK")
            {
                return BadRequest(json["status"]?.ToString());
            }

            // Extract the distance and duration
            var distance = json["rows"]?[0]?["elements"]?[0]?["distance"]?["value"];
            var duration = json["rows"]?[0]?["elements"]?[0]?["duration"]?["text"]?.ToString();

            return Ok(new
            {
                distance,
                duration
            });
        }

      
        private async Task<object> GetAddressDetailsFromPlaceId(string placeId)
        {
            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value;

            // Place Details API URL
            var requestUri = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&key={apiKey}";
            var response = await _httpClient.GetAsync(requestUri);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Failed to fetch place details. Status Code: {response.StatusCode}");
            }

            var result = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(result);

            if (json["status"]?.ToString() != "OK")
            {
                throw new Exception($"Error fetching place details: {json["status"]}");
            }

           var details = json["result"];
            var addressComponents = details?["address_components"];

            if (addressComponents == null)
            {
                return NotFound("Address components are missing from the response.");
            }
            // Helper function to extract a specific address component by type
            string? GetAddressComponent(string type)
            {
                return addressComponents?
                    .FirstOrDefault(c => c["types"]?.Any(t => t.ToString() == type) == true)?["long_name"]
                    ?.ToString();
            }

            // Extract properties
            var formattedAddress = new
            {
                Name = details?["formatted_address"]?.ToString(),
                Town = GetAddressComponent("sublocality_level_1"),
                City = GetAddressComponent("locality"),
                LocalGovt = GetAddressComponent("administrative_area_level_2"),
                State = GetAddressComponent("administrative_area_level_1"),
                PostalCode = GetAddressComponent("postal_code"),
                Longitude = details?["geometry"]?["location"]?["lng"],
                Latitude = details?["geometry"]?["location"]?["lat"]
            };

            return formattedAddress;
        }

        [HttpGet("addressfromplaceid")]
        public async Task<IActionResult> GetFromPlaceID([FromQuery] string placeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Enter place id");
            }
            try
            {
                var Address = await GetAddressDetailsFromPlaceId(placeId!);
                
                return Ok(new {
                    PlaceId = placeId,
                    Address,
                });
                
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }


        public IActionResult CalculateDistance([FromBody] DistanceRequest request)
        {
            if (request == null ||
                request.OriginLatitude == 0 || request.OriginLongitude == 0 ||
                request.DestinationLatitude == 0 || request.DestinationLongitude == 0)
            {
                return BadRequest("Invalid input. Please provide valid coordinates.");
            }

            // Calculate distance using the Haversine formula
            
            var distance = DistanceHelper.CalculateDistance(
                request.OriginLatitude,
                request.OriginLongitude,
                request.DestinationLatitude,
                request.DestinationLongitude
            );

            return Ok(new
            {
                Origin = new { Latitude = request.OriginLatitude, Longitude = request.OriginLongitude },
                Destination = new { Latitude = request.DestinationLatitude, Longitude = request.DestinationLongitude },
                DistanceInKm = distance
            });
        }

    }
}