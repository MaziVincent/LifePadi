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

<<<<<<< HEAD
<<<<<<< HEAD
            if (longitude is null || latitude is null)
            {
=======
            if(longitude is null  || latitude is null ){
>>>>>>> d189281 (worked on Login)
=======
            if (longitude is null || latitude is null)
            {
>>>>>>> 0ab4b1c (Google Maps Controller)
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
<<<<<<< HEAD
<<<<<<< HEAD
            return Ok(address);
=======
            return Ok(address );
>>>>>>> d189281 (worked on Login)
=======
            return Ok(address);
>>>>>>> 0ab4b1c (Google Maps Controller)
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

         [HttpGet("distance")]
<<<<<<< HEAD
        public async Task<IActionResult> GetDistance([FromQuery] Distance _distance){
        
=======
        public async Task<IActionResult> GetDistance([FromQuery] Distance _distance)
        {
>>>>>>> 0ab4b1c (Google Maps Controller)
            var origin = _distance.Origin;
            var destination = _distance.Destination;
            
            var apiKey = _config.GetSection("Google_Maps:Api_Key").Value; // Replace with your actual API key
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

<<<<<<< HEAD
            var distance = json["rows"]?[0]?["elements"]?[0]?["distance"]?["value"];
            var duration = json["rows"]?[0]?["elements"]?[0]?["duration"]?["text"];

            return Ok(new { distance, duration, json });
        }


        [HttpGet("autocomplete")]
    public async Task<IActionResult> GetAutocompleteSuggestions(string input)
    {
        var apiKey = _config.GetSection("Google_Maps:Api_Key").Value;
        var requestUri = $"https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}&key={apiKey}";
        var response = await _httpClient.GetAsync(requestUri);

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode);
        }

        var result = await response.Content.ReadAsStringAsync();
        return Ok(result);
    }



=======
            var distance = json["rows"]?[0]?["elements"]?[0]?["distance"]?["text"]?.ToString();
            var duration = json["rows"]?[0]?["elements"]?[0]?["duration"]?["text"]?.ToString();

            return Ok(new { distance, duration });
        }
>>>>>>> 0ab4b1c (Google Maps Controller)
    }
}