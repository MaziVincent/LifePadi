using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class DeliveryService : IDelivery
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        public DeliveryService(DBContext dBContext, IMapper mapper)
        {
            _dbContext = dBContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DeliveryDTO>> allAsync()
        {
            try
            {
                var delivries = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                var deliveryDTO = _mapper.Map<List<DeliveryDTO>>(delivries);
                return deliveryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDTOLite>> allDeliveryLiteAsync()
        {
            try
            {
                var delivries = await _dbContext.Deliveries
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                var deliveryDTOLite = _mapper.Map<List<DeliveryDTOLite>>(delivries);
                return deliveryDTOLite;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<DeliveryDTO> createAsync(DeliveryDTO delivery)
        {
            try
            {
                var newDelivery = _mapper.Map<Delivery>(delivery);
                await _dbContext.Deliveries.AddAsync(newDelivery);
                await _dbContext.SaveChangesAsync();
                var deliveryDTO = _mapper.Map<DeliveryDTO>(newDelivery);
                return deliveryDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> delete(int id)
        {
            try
            {
                var delivery = await _dbContext.Deliveries.FirstOrDefaultAsync(d => d.Id == id);
                if (delivery == null) return null!;
                _dbContext.Deliveries.Remove(delivery);
                await _dbContext.SaveChangesAsync();
                return "Delivery deleted";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<DeliveryDTO> getAsync(int id)
        {
            try
            {
                var delivery = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .FirstOrDefaultAsync(d => d.Id == id);
                if (delivery == null) return null!;
                var deliveryDTO = _mapper.Map<DeliveryDTO>(delivery);
                return deliveryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<DeliveryDTO> getOrderDelivery(int orderId)
        {
            try
            {
                var delivery = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .FirstOrDefaultAsync(d => d.OrderId == orderId);
                if (delivery == null) return null!;
                var deliveryDTO = _mapper.Map<DeliveryDTO>(delivery);
                return deliveryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDTO>> getRidersDeliveries(int riderId)
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .OrderByDescending(d => d.CreatedAt)
                    .Where(d => d.RiderId == riderId)
                    .ToListAsync();
                var deliveryDTO = _mapper.Map<List<DeliveryDTO>>(deliveries);
                return deliveryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDTOLite>> getunSuccessfulDelivery()
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .OrderByDescending(d => d.CreatedAt)
                    .Where(d => d.Status == "Unsuccessful")
                    .ToListAsync();
                var deliveryDTOLite = _mapper.Map<List<DeliveryDTOLite>>(deliveries);
                return deliveryDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDTO>> getWithStatus(string status)
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .OrderByDescending(d => d.CreatedAt)
                    .Where(d => d.Status!.Contains(status))
                    .ToListAsync();
                var deliveryDTO = _mapper.Map<List<DeliveryDTO>>(deliveries);
                return deliveryDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<DeliveryDTO> updateAsync(DeliveryDTO delivery, int id)
        {
            try
            {
                var initialDelivery = await _dbContext.Deliveries.FirstOrDefaultAsync(d => d.Id == id);
                if (initialDelivery == null) return null!;
                initialDelivery.DeliveryFee = delivery.DeliveryFee;
                initialDelivery.PickupAddress = delivery.PickupAddress;
                initialDelivery.RiderId = delivery.RiderId;
                initialDelivery.OrderId = delivery.OrderId;
                initialDelivery.UpdateAt = DateTime.UtcNow;
                initialDelivery.PickupType = delivery.PickupType;
                _dbContext.Deliveries.Attach(initialDelivery);
                await _dbContext.SaveChangesAsync();
                var deliveryDTO = _mapper.Map<DeliveryDTO>(initialDelivery);
                return deliveryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
