using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.DTO;
using Api.Helpers;
using Api.Interfaces;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoogleMapsController : ControllerBase
    {
        private readonly IGoogleMapsService _mapsService;

        public GoogleMapsController(IGoogleMapsService mapsService)
        {
            _mapsService = mapsService;
        }



        [HttpGet("address")]
        public async Task<IActionResult> GetAddressFromCoordinates([FromQuery] Coordinates coordinates)
        {
            try
            {
                var result = await _mapsService.GetAddressFromCoordinatesAsync(coordinates);
                if (result == null) return BadRequest("Longitude and Latitude must be provided or address not found");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("coordinates")]
        public async Task<IActionResult> GetCoordinatesFromAddress(string address)
        {
            if (string.IsNullOrWhiteSpace(address)) return BadRequest("Address is required");
            try
            {
                var coords = await _mapsService.GetCoordinatesFromAddressAsync(address);
                return Ok(new { latitude = coords.latitude, longitude = coords.longitude });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

         [HttpGet("distancewithaddress")]
        public async Task<IActionResult> GetDistance([FromQuery] Distance _distance){
            try
            {
                var result = await _mapsService.GetDistanceByAddressAsync(_distance);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("autocomplete")]
        public async Task<IActionResult> GetAutocompleteSuggestions(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return BadRequest("Input is required");
            try
            {
                var suggestions = await _mapsService.GetAutocompleteSuggestionsAsync(input);
                return Ok(suggestions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("distancewithplaceid")]
        public async Task<IActionResult> CalculateDistance([FromQuery] Distance _distance)
        {
            try
            {
                var result = await _mapsService.CalculateDistanceByPlaceIdAsync(_distance);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

      
    // Kept method removed; logic moved to service.

        [HttpGet("addressfromplaceid")]
        public async Task<IActionResult> GetFromPlaceID([FromQuery] string placeId)
        {
            if (string.IsNullOrWhiteSpace(placeId)) return BadRequest("Enter place id");
            try
            {
                var address = await _mapsService.GetAddressDetailsFromPlaceIdAsync(placeId);
                if (address == null) return NotFound("Address components are missing from the response.");
                return Ok(new { PlaceId = placeId, Address = address });
            }
            catch (Exception ex)
            {
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
            var distance = _mapsService.CalculateHaversineDistance(
                request.OriginLatitude,
                request.OriginLongitude,
                request.DestinationLatitude,
                request.DestinationLongitude);
            return Ok(new
            {
                Origin = new { Latitude = request.OriginLatitude, Longitude = request.OriginLongitude },
                Destination = new { Latitude = request.DestinationLatitude, Longitude = request.DestinationLongitude },
                DistanceInKm = distance
            });
        }

    }
}