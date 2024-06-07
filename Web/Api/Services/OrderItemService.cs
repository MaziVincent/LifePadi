using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class OrderItemService : IOrderItem
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        public OrderItemService(DBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<DataTotalNumber> allAsync()
        {
            try
            {
                var orderItems = await _dbContext.OrdersItems
                    .Include(o => o.Product)
                    .Include(o => o.Order)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var OrderItemDto = _mapper.Map<List<OrderItemDto>>(orderItems);
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count,
                    Data = OrderItemDto.ToArray(),
                };

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
=======
                var orderItemDTO = _mapper.Map<List<OrderItemDTO>>(orderItems);
=======
                var OrderItemDto = _mapper.Map<List<OrderItemDto>>(orderItems);
>>>>>>> 836ec36 (changed all DTO to Dto)
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count(),
                    Data = OrderItemDto.ToArray(),
                };

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> 4641615 (finished with delivery service and controller)
            }
        }

        public async Task<DataTotalNumber> allOrderItemLiteAsync()
        {
            try
            {
                var orderItems = await _dbContext.OrdersItems
                    .Include(o => o.Product)
                    .Include(o => o.Order)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var OrderItemDtoLite = _mapper.Map<List<OrderItemDtoLite>>(orderItems);
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count,
                    Data = OrderItemDtoLite.ToArray(),
=======
                var orderItemDTOLite = _mapper.Map<List<OrderItemDTOLite>>(orderItems);
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count(),
                    Data = orderItemDTOLite.ToArray(),
>>>>>>> 4641615 (finished with delivery service and controller)
=======
                var OrderItemDtoLite = _mapper.Map<List<OrderItemDtoLite>>(orderItems);
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count(),
                    Data = OrderItemDtoLite.ToArray(),
>>>>>>> 836ec36 (changed all DTO to Dto)
                };

            }
            catch (Exception ex)
            {
<<<<<<< HEAD
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<OrderItemDto> createAsync(OrderItemDto orderItem)
=======
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<OrderItemDTO> createAsync(OrderItemDTO orderItem)
>>>>>>> 4641615 (finished with delivery service and controller)
=======
        public async Task<OrderItemDto> createAsync(OrderItemDto orderItem)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var newOrderItem = _mapper.Map<OrderItem>(orderItem);
<<<<<<< HEAD
                if (orderItem.Name == null) newOrderItem.Name = orderItem.Product!.Name;
                if (orderItem.Description == null) newOrderItem.Description = orderItem.Product!.Description;
=======
>>>>>>> 4641615 (finished with delivery service and controller)
                newOrderItem.SetQuantity(orderItem.Quantity);
                newOrderItem.SetAmount(orderItem.Amount);
                await _dbContext.OrdersItems.AddAsync(newOrderItem);
                await _dbContext.SaveChangesAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var OrderItemDto = _mapper.Map<OrderItemDto>(newOrderItem);
                return OrderItemDto;
            }
            
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
=======
                var orderItemDTO = _mapper.Map<OrderItemDTO>(newOrderItem);
                return orderItemDTO;
=======
                var OrderItemDto = _mapper.Map<OrderItemDto>(newOrderItem);
                return OrderItemDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> 4641615 (finished with delivery service and controller)
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var orderItem = await _dbContext.OrdersItems.FirstOrDefaultAsync(o => o.Id == id);
                if (orderItem == null) return null!;
                _dbContext.OrdersItems.Remove(orderItem);
                await _dbContext.SaveChangesAsync();
                return "Item deleted";
<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<OrderItemDto> getAsync(int id)
=======
        public async Task<OrderItemDTO> getAsync(int id)
>>>>>>> 4641615 (finished with delivery service and controller)
=======
        public async Task<OrderItemDto> getAsync(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var orderItem = await _dbContext.OrdersItems
                    .Include(o => o.Order)
                    .Include(o => o.Product)
                    .FirstOrDefaultAsync(o => o.Id == id);
                if (orderItem == null) return null!;
<<<<<<< HEAD
<<<<<<< HEAD
                var OrderItemDto = _mapper.Map<OrderItemDto>(orderItem);
                return OrderItemDto;
=======
                var orderItemDTO = _mapper.Map<OrderItemDTO>(orderItem);
                return orderItemDTO;
>>>>>>> 4641615 (finished with delivery service and controller)
=======
                var OrderItemDto = _mapper.Map<OrderItemDto>(orderItem);
                return OrderItemDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 98415b4 (done with dashboard)
        public async Task<int> totalNumberOfOrderItems()
        {
            try
            {
                var orderItems = await _dbContext.OrdersItems.CountAsync();
                return orderItems;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<OrderItemDto> updateAsync(OrderItemDto orderItem, int id)
=======
=======
>>>>>>> 98415b4 (done with dashboard)
        public async Task<OrderItemDTO> updateAsync(OrderItemDTO orderItem, int id)
>>>>>>> 4641615 (finished with delivery service and controller)
=======
        public async Task<OrderItemDto> updateAsync(OrderItemDto orderItem, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var initialOrderItem = await _dbContext.OrdersItems.FirstOrDefaultAsync(o => o.Id == id);
                if (initialOrderItem == null) return null!;
                initialOrderItem.ProductId = orderItem.ProductId;
                initialOrderItem.OrderId = orderItem.OrderId;
                initialOrderItem.Quantity = orderItem.Quantity;
                initialOrderItem.Amount = orderItem.Amount;
                initialOrderItem.UpdatedAt = DateTime.UtcNow;
                _dbContext.OrdersItems.Attach(initialOrderItem);
                await _dbContext.SaveChangesAsync();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
                var OrderItemDto = _mapper.Map<OrderItemDto>(initialOrderItem);
                return OrderItemDto;
            }
            catch (Exception ex)
=======
                var orderItemDTO = _mapper.Map<OrderItemDTO>(initialOrderItem);
                return orderItemDTO;
<<<<<<< HEAD
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
