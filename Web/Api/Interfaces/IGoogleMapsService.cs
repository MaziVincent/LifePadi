using System.Threading.Tasks;
using Api.DTO;

namespace Api.Interfaces
{
    public interface IGoogleMapsService
    {
        Task<object?> GetAddressFromCoordinatesAsync(Coordinates coordinates);
        Task<(double? latitude, double? longitude)> GetCoordinatesFromAddressAsync(string address);
        Task<object> GetDistanceByAddressAsync(Distance distanceDto);
        Task<object> GetAutocompleteSuggestionsAsync(string input);
        Task<object> CalculateDistanceByPlaceIdAsync(Distance distanceDto);
        Task<object?> GetAddressDetailsFromPlaceIdAsync(string placeId);
        double CalculateHaversineDistance(double originLat, double originLng, double destLat, double destLng);
    }
}
