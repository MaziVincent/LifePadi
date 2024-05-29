using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class OrderService : IOrder
    {
        private readonly DBContext? _dbContext;
        private readonly IMapper _mapper;
        public OrderService( DBContext dBContext, IMapper mapper)
        {
            _dbContext = dBContext;
            _mapper = mapper;
        }
        public async Task<DataTotalNumber> allAsync()
        {
            try
            {
                var orders = await _dbContext!.Orders
                    .Include(o => o.Customer)
                    .Include(o => o.OrderItems)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();
                var orderDTO = _mapper.Map<List<OrderDTO>>(orders);
                return new DataTotalNumber
                {
                    TotalNumber = orders.Count(),
                    Data = orderDTO.ToArray(),
                };
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDTOLite>> allOrderLite()
        {
            try
            {
                var orders = await _dbContext!.Orders.OrderByDescending(o => o.CreatedAt).ToListAsync();
                var orderDTOLite = _mapper.Map<List<OrderDTOLite>>(orders);
                return orderDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrderDTO> createAsync(OrderDTO order)
        {
            try
            {
                var newOrder = _mapper.Map<Order>(order);
                newOrder.Status = "Pending";
                newOrder.IsDelivered = false;
                await _dbContext!.Orders.AddAsync(newOrder);
                await _dbContext.SaveChangesAsync();
                var orderDTO = _mapper.Map<OrderDTO>(newOrder);
                return orderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDTO>> customerOrders(int customerId)
        {
            try
            {
                var orders = await _dbContext!.Orders
                    .Include(o => o.OrderItems)
                    .Include(o => o.Customer)
                    .OrderByDescending(o => o.CreatedAt)
                    .Where(o => o.CustomerId == customerId)
                    .ToListAsync();
                var orderDTO = _mapper.Map<List<OrderDTO>>(orders);
                return orderDTO;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var order = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (order == null) return null!;
                _dbContext.Orders.Remove(order);
                await _dbContext.SaveChangesAsync();
                return "Order deleted";
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrderDTO> getAsync(int id)
        {
            try
            {
                var order = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (order == null) return null!;
                var orderDTO = _mapper.Map<OrderDTO>(order);
                return orderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderItemDTOLite>> orderItemLites(int id)
        {
            try
            {
                var order = await _dbContext!.Orders
                    .Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
                var orderItems = _mapper.Map<List<OrderItemDTOLite>>(order!.OrderItems);
                return orderItems;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        

        public async Task<OrderDTO> updateAsync(OrderDTO order, int id)
        {
            try
            {
                var initialOrder = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (initialOrder == null) return null!;
                initialOrder.Status = order.Status;
                initialOrder.CustomerId = order.CustomerId;
                initialOrder.UpdatedAt = DateTime.UtcNow;
                initialOrder.IsDelivered = order.IsDelivered;
                _dbContext.Orders.Attach(initialOrder);
                await _dbContext.SaveChangesAsync();
                var orderDTO = _mapper.Map<OrderDTO>(initialOrder);
                return orderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrderDTO> updateOrderStatus(int id, string status)
        {
            try
            {
                var order = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (order == null) return null!;
                order.Status = status;
                _dbContext.Orders.Attach(order);
                await _dbContext.SaveChangesAsync();
                var orderDTO = _mapper.Map<OrderDTO>(order);
                return orderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
