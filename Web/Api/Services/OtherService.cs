using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Newtonsoft.Json.Linq;

namespace Api.Services
{
    public class OtherService : IOtherService
    {
        private readonly IGoogleMapsService _mapsService;
        private readonly IDelivery _delivery;
        private readonly DBContext _dbContext;
    private readonly IMapper _mapper;

        public OtherService(IGoogleMapsService mapsService, IDelivery delivery, DBContext context, IMapper mapper)
        {
            _mapsService = mapsService;
            _delivery = delivery;
            _dbContext = context;
            _mapper = mapper;
        }
        public string Strip(string type)
        {

            var retype = type.Substring(type.LastIndexOf('.') + 1);
            return retype;
        }

        public async Task<object> GetYonkoDeliveryFee(Distance distance)
        {
            // Get distance data from Google Maps (anonymous object with distance + duration)
            var raw = await _mapsService.GetDistanceByAddressAsync(distance);

            // Extract distance value (meters) safely via reflection/JToken since return type is object
            double meters = 0;
            if (raw != null)
            {
                var prop = raw.GetType().GetProperty("distance");
                var value = prop?.GetValue(raw);
                if (value is JToken jt)
                {
                    meters = jt.Type switch
                    {
                        JTokenType.Integer => jt.Value<long>(),
                        JTokenType.Float => jt.Value<double>(),
                        _ => jt.Value<double?>() ?? 0
                    };
                }
                else if (value is int i) meters = i;
                else if (value is long l) meters = l;
                else if (value is double d) meters = d;
            }

            // Convert meters to kilometers for existing fee calculation logic
            double km = meters / 1000d;

            var feeDto = new DeliveryFeeDto { Distance = km };
            var feeResult = _delivery.calculateDeliveryFee(feeDto); // already returns { DeliveryFee = x }
            return feeResult;
        }

        public async Task<YonkoDeliveryDTO> CreateYonkoDelivery(CreateYonkoDeliveryDTO createYonkoDelivery)
        {
            var mappedDelivery = _mapper.Map<YonkoDelivery>(createYonkoDelivery);
            mappedDelivery.Status = mappedDelivery.Status ?? "Pending";
            mappedDelivery.CreatedAt = DateTime.UtcNow;
            mappedDelivery.UpdatedAt = DateTime.UtcNow;

            await _dbContext.YonkoDeliveries.AddAsync(mappedDelivery);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<YonkoDeliveryDTO>(mappedDelivery);
        }

        public async Task<YonkoDeliveryDTO?> UpdateYonkoDelivery(int id, CreateYonkoDeliveryDTO updateYonkoDelivery)
        {
            var existing = await _dbContext.YonkoDeliveries.FindAsync(id);
            if (existing == null) return null;

            // Map updatable fields (avoid overwriting CreatedAt)
            existing.PickUpAddress = updateYonkoDelivery.PickUpAddress ?? existing.PickUpAddress;
            existing.DeliveryAddress = updateYonkoDelivery.DeliveryAddress ?? existing.DeliveryAddress;
            existing.PickupType = updateYonkoDelivery.PickupType ?? existing.PickupType;
            existing.DeliveryFee = updateYonkoDelivery.DeliveryFee != 0 ? updateYonkoDelivery.DeliveryFee : existing.DeliveryFee;
            existing.Status = updateYonkoDelivery.Status ?? existing.Status;
            existing.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return _mapper.Map<YonkoDeliveryDTO>(existing);
        }

        public Task<PagedList<YonkoDeliveryDTO>> GetAllYonkoDeliveries(SearchPaging props)
        {
            var query = _dbContext.YonkoDeliveries.AsQueryable();

            if (!string.IsNullOrWhiteSpace(props.SearchString))
            {
                var search = props.SearchString.Trim().ToLower();
                query = query.Where(y => (y.PickUpAddress != null && y.PickUpAddress.ToLower().Contains(search))
                                      || (y.DeliveryAddress != null && y.DeliveryAddress.ToLower().Contains(search))
                                      || (y.Status != null && y.Status.ToLower().Contains(search))
                                      || (y.PickupType != null && y.PickupType.ToLower().Contains(search))
                                      || (y.CustomerFirstName != null && y.CustomerFirstName.ToLower().Contains(search))
                                      || (y.CustomerLastName != null && y.CustomerLastName.ToLower().Contains(search))
                                      );
            }

            query = query.OrderByDescending(y => y.CreatedAt);

            var projected = query.Select(y => new YonkoDeliveryDTO
            {
                Id = y.Id,
                PickUpAddress = y.PickUpAddress,
                DeliveryAddress = y.DeliveryAddress,
                PickupType = y.PickupType,
                DeliveryFee = y.DeliveryFee,
                CustomerFirstName = y.CustomerFirstName,
                CustomerLastName = y.CustomerLastName,
                CustomerEmail = y.CustomerEmail,
                PhoneNumber = y.PhoneNumber,
                Status = y.Status,
                RiderId = y.RiderId,
                Rider = y.Rider,
                CreatedAt = y.CreatedAt,
                UpdatedAt = y.UpdatedAt
            }).ToList();

            var paged = PagedList<YonkoDeliveryDTO>.ToPagedList(projected, props.PageNumber, props.PageSize);
            return Task.FromResult(paged);
        }

        public async Task<YonkoDeliveryDTO?> GetYonkoDelivery(int id)
        {
            var entity = await _dbContext.YonkoDeliveries.FindAsync(id);
            return entity == null ? null : _mapper.Map<YonkoDeliveryDTO>(entity);
        }

        public async Task<bool> DeleteYonkoDelivery(int id)
        {
            var entity = await _dbContext.YonkoDeliveries.FindAsync(id);
            if (entity == null) return false;
            _dbContext.YonkoDeliveries.Remove(entity);
            await _dbContext.SaveChangesAsync();
            return true;
        }
   
    }
}