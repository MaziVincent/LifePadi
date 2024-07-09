using Api.DTO;
using Api.Interfaces;
using Api.Models;
using API.DTO;
using API.Models;
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
        public async Task<IEnumerable<DeliveryDto>> allAsync()
        {
            try
            {
                var delivries = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                var DeliveryDto = _mapper.Map<List<DeliveryDto>>(delivries);
                return DeliveryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDtoLite>> allDeliveryLiteAsync()
        {
            try
            {
                var delivries = await _dbContext.Deliveries
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                var DeliveryDtoLite = _mapper.Map<List<DeliveryDtoLite>>(delivries);
                return DeliveryDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> assynRiderTODelivery(int id, int riderId)
        {
            try
            {
                var delivery = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .FirstOrDefaultAsync(d => d.Id == id);
                if (delivery == null) return null!;
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == riderId);
                if (rider == null) return null!;
                delivery.RiderId = riderId;
                delivery.UpdateAt = DateTime.UtcNow;
                _dbContext.Deliveries.Attach(delivery);
                await _dbContext.SaveChangesAsync();
                return "Rider assign successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<CreateDeliveryDto> createAsync(DeliveryDto delivery)
        {
            try
            {
                var initialDelivery = await _dbContext.Deliveries.FirstOrDefaultAsync(d => d.OrderId == delivery.OrderId);
                if (initialDelivery == null)
                {
                    var newDelivery = _mapper.Map<Delivery>(delivery);
                    newDelivery.Status = "Pending";
                    await _dbContext.Deliveries.AddAsync(newDelivery);
                    await _dbContext.SaveChangesAsync();
                    var DeliveryDto = _mapper.Map<CreateDeliveryDto>(newDelivery);
                    return DeliveryDto;
                }
                throw new Exceptions.ServiceException("Already created delivery for this order");
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
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
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> deliveryStats()
        {
            try
            {
                var stats = new
                {
                    totalDeliveries = await totalNumberOfDeliveries(),
                    totalSuccessfulDeliveries = await totalNumberOfSuccessfulDeliveries(),
                    totalUnSuccessfulDeliveries = await totalNumberOfUnSuccessfulDeliveries(),
                    totalPendingDeliveries = await totalNumberOfPendingDeliveries(),
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DeliveryDto> getAsync(int id)
        {
            try
            {
                var delivery = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .FirstOrDefaultAsync(d => d.Id == id);
                if (delivery == null) return null!;
                var DeliveryDto = _mapper.Map<DeliveryDto>(delivery);
                return DeliveryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DeliveryDto> getOrderDelivery(int orderId)
        {
            try
            {
                var delivery = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .FirstOrDefaultAsync(d => d.OrderId == orderId);
                if (delivery == null) return null!;
                var DeliveryDto = _mapper.Map<DeliveryDto>(delivery);
                return DeliveryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Delivery>> getRidersDeliveries(int riderId, SearchPaging props)
        {
            try
            {
                IQueryable<Delivery> deliveryList = Enumerable.Empty<Delivery>().AsQueryable();
                if (props.SearchString is null)
                {
                    var deliveries = await _dbContext.Deliveries
                        .Include(d => d.Order)
                        .Include(d => d.Rider)
                        .OrderByDescending(d => d.CreatedAt)
                        .Where(d => d.RiderId == riderId)
                        .ToListAsync();
                    deliveryList = deliveryList.Concat(deliveries);
                    var result = PagedList<Delivery>.ToPagedList(deliveryList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var deliveries = await _dbContext.Deliveries
                        .Include(d => d.Order)
                        .Include(d => d.Rider)
                        .OrderByDescending(d => d.CreatedAt)
                        .Where(d => d.RiderId == riderId && d.PickupAddress!.ToLower().Contains(props.SearchString.ToLower()))
                        .ToListAsync();
                    deliveryList = deliveryList.Concat(deliveries);
                    var result = PagedList<Delivery>.ToPagedList(deliveryList, props.PageNumber, props.PageSize);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDtoLite>> getunSuccessfulDelivery()
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .OrderByDescending(d => d.CreatedAt)
                    .Where(d => d.Status == "Unsuccessful")
                    .ToListAsync();
                var DeliveryDtoLite = _mapper.Map<List<DeliveryDtoLite>>(deliveries);
                return DeliveryDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDto>> getWithStatus(string status)
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .OrderByDescending(d => d.CreatedAt)
                    .Where(d => d.Status!.Contains(status))
                    .ToListAsync();
                var DeliveryDto = _mapper.Map<List<DeliveryDto>>(deliveries);
                return DeliveryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDto>> getWithStatusForRider(int riderId, string status)
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Include(d => d.Order)
                    .Include(d => d.Rider)
                    .OrderByDescending(d => d.CreatedAt)
                    .Where(d => d.RiderId == riderId && d.Status!.Contains(status))
                    .ToListAsync();
                var DeliveryDto = _mapper.Map<List<DeliveryDto>>(deliveries);
                return DeliveryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> getWithStatusForRiderCount(int riderId)
        {
            try
            {
                var pending = await _dbContext.Deliveries
                    .Where(d => d.RiderId == riderId && d.Status!.Contains("Pending"))
                    .CountAsync();
                var successful = await _dbContext.Deliveries
                    .Where(d => d.RiderId == riderId && d.Status!.Contains("Successful"))
                    .CountAsync();
                var unsuccessful = await _dbContext.Deliveries
                    .Where(d => d.RiderId == riderId && d.Status!.Contains("Unsuccessful"))
                    .CountAsync();
                return new {
                    pending= pending,
                    successful= successful,
                    unsuccessful= unsuccessful
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfDeliveries()
        {
            try
            {
                var deliveries = await _dbContext.Deliveries.CountAsync();
                return deliveries;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfDeliveriesByRider(int riderId)
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Where(d => d.RiderId == riderId)
                    .CountAsync();
                return deliveries;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfPendingDeliveries()
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Where(d => d.Status == "Pending")
                    .CountAsync();
                return deliveries;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfSuccessfulDeliveries()
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Where(d => d.Status == "Successful")
                    .CountAsync();
                return deliveries;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfUnSuccessfulDeliveries()
        {
            try
            {
                var deliveries = await _dbContext.Deliveries
                    .Where(d => d.Status == "Unsuccessful")
                    .CountAsync();
                return deliveries;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DeliveryDto> updateAsync(DeliveryDto delivery, int id)
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
                var DeliveryDto = _mapper.Map<DeliveryDto>(initialDelivery);
                return DeliveryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> updateStatus(string status, int id)
        {
            try
            {
                var delivery = await _dbContext.Deliveries.FirstOrDefaultAsync(d => d.Id == id);
                if (delivery == null) return null!;
                delivery.Status = status;
                delivery.UpdateAt = DateTime.UtcNow;
                _dbContext.Deliveries.Attach(delivery);
                await _dbContext.SaveChangesAsync();
                return "Delivery status updated";
            }catch(Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
