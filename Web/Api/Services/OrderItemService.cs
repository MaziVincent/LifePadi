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
                var orderItemDTO = _mapper.Map<List<OrderItemDTO>>(orderItems);
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count(),
                    Data = orderItemDTO.ToArray(),
                };

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                var orderItemDTOLite = _mapper.Map<List<OrderItemDTOLite>>(orderItems);
                return new DataTotalNumber
                {
                    TotalNumber = orderItems.Count(),
                    Data = orderItemDTOLite.ToArray(),
                };

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrderItemDTO> createAsync(OrderItemDTO orderItem)
        {
            try
            {
                var newOrderItem = _mapper.Map<OrderItem>(orderItem);
                newOrderItem.SetQuantity(orderItem.Quantity);
                newOrderItem.SetAmount(orderItem.Amount);
                await _dbContext.OrdersItems.AddAsync(newOrderItem);
                await _dbContext.SaveChangesAsync();
                var orderItemDTO = _mapper.Map<OrderItemDTO>(newOrderItem);
                return orderItemDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrderItemDTO> getAsync(int id)
        {
            try
            {
                var orderItem = await _dbContext.OrdersItems
                    .Include(o => o.Order)
                    .Include(o => o.Product)
                    .FirstOrDefaultAsync(o => o.Id == id);
                if (orderItem == null) return null!;
                var orderItemDTO = _mapper.Map<OrderItemDTO>(orderItem);
                return orderItemDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

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

        public async Task<OrderItemDTO> updateAsync(OrderItemDTO orderItem, int id)
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
                var orderItemDTO = _mapper.Map<OrderItemDTO>(initialOrderItem);
                return orderItemDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
