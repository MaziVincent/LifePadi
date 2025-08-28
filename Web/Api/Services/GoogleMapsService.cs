using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;

namespace Api.Services
{
    public class GoogleMapsService : IGoogleMapsService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly IMemoryCache _cache;
        private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

        public GoogleMapsService(HttpClient httpClient, IConfiguration config, IMemoryCache cache)
        {
            _httpClient = httpClient;
            _config = config;
            _cache = cache;
        }

        private string GetApiKey() => Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") ?? _config.GetSection("Google_Maps:Api_Key").Value!;

        private async Task<JObject> GetJsonAsync(string cacheKey, string url)
        {
            if (_cache.TryGetValue(cacheKey, out JObject? cached) && cached != null) return cached;

            var response = await _httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(content);
            }

            var json = JObject.Parse(content);
            if (json["status"]?.ToString() != "OK")
            {
                throw new Exception(json["status"]?.ToString() ?? "Unknown error");
            }

            _cache.Set(cacheKey, json, CacheDuration);
            return json;
        }

        public async Task<object?> GetAddressFromCoordinatesAsync(Coordinates coordinates)
        {
            if (coordinates.Latitude == null || coordinates.Longitude == null)
            {
                return null;
            }
            var apiKey = GetApiKey();
            var url = $"https://maps.googleapis.com/maps/api/geocode/json?latlng={coordinates.Latitude},{coordinates.Longitude}&key={apiKey}";
            var json = await GetJsonAsync($"geocode:{coordinates.Latitude}:{coordinates.Longitude}", url);
            var details = json["results"]?.FirstOrDefault();
            var addressComponents = details?["address_components"];
            if (addressComponents == null) return null;

            string? GetComponent(string type) => addressComponents?
                .FirstOrDefault(c => c["types"]?.Any(t => t!.ToString() == type) == true)?["long_name"]?.ToString();

            return new
            {
                Name = details?["formatted_address"]?.ToString(),
                Town = GetComponent("sublocality_level_1"),
                City = GetComponent("locality"),
                LocalGovt = GetComponent("administrative_area_level_2"),
                State = GetComponent("administrative_area_level_1"),
                PostalCode = GetComponent("postal_code"),
                Longitude = details?["geometry"]?["location"]?["lng"],
                Latitude = details?["geometry"]?["location"]?["lat"]
            };
        }

        public async Task<(double? latitude, double? longitude)> GetCoordinatesFromAddressAsync(string address)
        {
            var apiKey = GetApiKey();
            var url = $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={apiKey}";
            var json = await GetJsonAsync($"coords:{address}", url);
            var location = json["results"]?[0]?["geometry"]?["location"];
            return (location?["lat"]?.ToObject<double>(), location?["lng"]?.ToObject<double>());
        }

        public async Task<object> GetDistanceByAddressAsync(Distance distanceDto)
        {
            var apiKey = GetApiKey();
            var url = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={distanceDto.Origin}&destinations={distanceDto.Destination}&key={apiKey}";
            var json = await GetJsonAsync($"distaddr:{distanceDto.Origin}:{distanceDto.Destination}", url);
            var distance = json["rows"]?[0]?["elements"]?[0]?["distance"]?["value"];
            var duration = json["rows"]?[0]?["elements"]?[0]?["duration"]?["text"];
            return new { distance, duration };
        }

        public async Task<object> GetAutocompleteSuggestionsAsync(string input)
        {
            var apiKey = GetApiKey();
            var url = $"https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}&components=country:ng&key={apiKey}";
            var json = await GetJsonAsync($"ac:{input}", url);
            var suggestions = json["predictions"] == null
                ? null
                : json["predictions"]!
                    .Select(p => (object)new {
                        description = p["description"]?.ToString(),
                        placeId = p["place_id"]?.ToString()
                    })
                    .ToList();
            if (suggestions == null || suggestions.Count == 0)
            {
                return Array.Empty<object>();
            }
            return suggestions;
        }

        public async Task<object> CalculateDistanceByPlaceIdAsync(Distance distanceDto)
        {
            var apiKey = GetApiKey();
            var url = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:{distanceDto.Origin}&destinations=place_id:{distanceDto.Destination}&key={apiKey}";
            var json = await GetJsonAsync($"distpid:{distanceDto.Origin}:{distanceDto.Destination}", url);
            var distance = json["rows"]?[0]?["elements"]?[0]?["distance"]?["value"];
            var duration = json["rows"]?[0]?["elements"]?[0]?["duration"]?["text"]?.ToString();
            return new { distance, duration };
        }

        public async Task<object?> GetAddressDetailsFromPlaceIdAsync(string placeId)
        {
            var apiKey = GetApiKey();
            var url = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&key={apiKey}";
            var json = await GetJsonAsync($"place:{placeId}", url);
            var details = json["result"];
            var addressComponents = details?["address_components"];
            if (addressComponents == null) return null;

            string? GetComponent(string type) => addressComponents?
                .FirstOrDefault(c => c["types"]?.Any(t => t!.ToString() == type) == true)?["long_name"]?.ToString();

            return new
            {
                Name = details?["formatted_address"]?.ToString(),
                Town = GetComponent("sublocality_level_1"),
                City = GetComponent("locality"),
                LocalGovt = GetComponent("administrative_area_level_2"),
                State = GetComponent("administrative_area_level_1"),
                PostalCode = GetComponent("postal_code"),
                Longitude = details?["geometry"]?["location"]?["lng"],
                Latitude = details?["geometry"]?["location"]?["lat"]
            };
        }

        public double CalculateHaversineDistance(double originLat, double originLng, double destLat, double destLng)
        {
            return DistanceHelper.CalculateDistance(originLat, originLng, destLat, destLng);
        }
    }
}
