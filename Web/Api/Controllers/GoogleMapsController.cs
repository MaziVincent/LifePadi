using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Api.DTO;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoogleMapsController : ControllerBase
    {
         private readonly HttpClient _httpClient;
        private IConfiguration _config;
        
        public GoogleMapsController( HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _config = configuration;
        }
        
   

     [HttpGet("address")]
        public async Task<IActionResult> GetAddressFromCoordinates([FromQuery] Coordinates coordinates)
        {
            var longitude = coordinates.Longitude;
            var latitude = coordinates.Latitude;

            if(longitude is null  || latitude is null ){
                return BadRequest();
            }

            var apiKey = _config.GetSection("Google_Maps:Api_Key").Value; // Replace with your actual API key
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

            var address = json["results"]?[0]?["formatted_address"]?.ToString();
            return Ok(address );
        }

        [HttpGet("coordinates")]
        public async Task<IActionResult> GetCoordinatesFromAddress(string address)
        {
            var apiKey = _config.GetSection("Google_Maps:Api_Key").Value; // Replace with your actual API key
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
}
}