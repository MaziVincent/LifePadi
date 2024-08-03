using Api.DTO;
using Api.Interfaces;
using Api.Models;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Api.Exceptions;

namespace Api.Services
{
    public class OrderService : IOrder
    {
        private readonly DBContext? _dbContext;
        private readonly IMapper _mapper;
        public OrderService(DBContext dBContext, IMapper mapper)
        {
            _dbContext = dBContext;
            _mapper = mapper;
        }
        public async Task<PagedList<Order>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Order> orderList = Enumerable.Empty<Order>().AsQueryable();

                var _orders = await _dbContext!.Orders
               .Include(o => o.Customer)
               .Include(o => o.OrderItems)
               .OrderByDescending(o => o.CreatedAt)
               .ToListAsync();
                orderList = orderList.Concat(_orders);
                var result = PagedList<Order>.ToPagedList(orderList, props.PageNumber, props.PageSize);
                return result;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDtoLite>> allOrderLite()
        {
            try
            {
                var orders = await _dbContext!.Orders.OrderByDescending(o => o.CreatedAt).ToListAsync();
                var OrderDtoLite = _mapper.Map<List<OrderDtoLite>>(orders);
                return OrderDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<OrderDto> createAsync(OrderDto order)
        {
            try
            {
                var newOrder = _mapper.Map<Order>(order);
                newOrder.Status = "Pending";
                if (order.Type is null)
                {
                    newOrder.Type = "Normal";

                }
                else
                {
                    newOrder.Type = order.Type;
                }
                newOrder.IsDelivered = false;
                newOrder.SearchString = newOrder.Status.ToUpper() + " " + newOrder.Type!.ToUpper();
                await _dbContext!.Orders.AddAsync(newOrder);
                await _dbContext.SaveChangesAsync();
                var OrderDto = _mapper.Map<OrderDto>(newOrder);
                return OrderDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDto>> customerOrders(int customerId)
        {
            try
            {
                var orders = await _dbContext!.Orders
                    .Include(o => o.OrderItems)
                    .Include(o => o.Customer)
                    .OrderByDescending(o => o.CreatedAt)
                    .Where(o => o.CustomerId == customerId)
                    .ToListAsync();
                var OrderDto = _mapper.Map<List<OrderDto>>(orders);
                return OrderDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
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
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<OrderDto> getAsync(int id)
        {
            try
            {
                var order = await _dbContext!.Orders.Where(o => o.Id == id)
                    .Include(o => o.Customer)
                    .Include(o => o.OrderItems)!.ThenInclude(i => i.Product)
                    .FirstOrDefaultAsync();
                if (order == null) return null!;
                var OrderDto = _mapper.Map<OrderDto>(order);
                return OrderDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderItemDtoLite>> orderItemLites(int id)
        {
            try
            {
                var order = await _dbContext!.Orders
                    .Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
                var orderItems = _mapper.Map<List<OrderItemDtoLite>>(order!.OrderItems);
                return orderItems;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<object> orderStats()
        {
            try
            {
                var stats = new
                {
                    totalNumberOfOrders = await totalNumberOfOrders(),
                    totalNumberOfPendingOrders = await totalNumberOfPendingOrders(),
                    totalNumberOfDeliveredOrders = await totalNumberOfDeliveredOrders(),
                    totalNumberOfCancelledOrders = await totalNumberOfCancelledOrders(),
                    totalNumberOfOrdersToday = await totalNumberOfOrdersToday(),
                    totalNumberOfOrdersThisMonth = await totalNumberOfOrdersThisMonth(),
                    totalNumberOfOrdersThisYear = await totalNumberOfOrdersThisYear(),
                    totalNumberOfClosedOrders = await totalNumberOfClosedOrders()
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfCancelledOrders()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.Status == "Cancelled").CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfClosedOrders()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.Status == "Closed").CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfDeliveredOrders()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.Status == "Delivered").CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfOrders()
        {
            try
            {
                var orders = await _dbContext!.Orders.CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfOrdersThisMonth()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.CreatedAt.Month == DateTime.UtcNow.Month).CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfOrdersThisYear()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.CreatedAt.Year == DateTime.UtcNow.Year).CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfOrdersToday()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.CreatedAt.Date == DateTime.UtcNow.Date).CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfPendingOrders()
        {
            try
            {
                var orders = await _dbContext!.Orders.Where(o => o.Status == "Pending").CountAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<OrderDto> updateAsync(OrderDto order, int id)
        {
            try
            {
                var initialOrder = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (initialOrder == null) return null!;
                initialOrder.Status = order.Status;
                initialOrder.CustomerId = order.CustomerId;
                initialOrder.UpdatedAt = DateTime.UtcNow;
                initialOrder.IsDelivered = order.IsDelivered;
                initialOrder.Type = order.Type;
                initialOrder.Instruction = order.Instruction;
                initialOrder.SearchString = initialOrder.Status!.ToUpper() + " " + initialOrder.Type!.ToUpper();
                _dbContext.Orders.Attach(initialOrder);
                await _dbContext.SaveChangesAsync();
                var OrderDto = _mapper.Map<OrderDto>(initialOrder);
                return OrderDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<OrderDto> updateOrderStatus(int id, string status)
        {
            try
            {
                var order = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (order == null) return null!;
                order.Status = status;
                _dbContext.Orders.Attach(order);
                await _dbContext.SaveChangesAsync();
                var OrderDto = _mapper.Map<OrderDto>(order);
                return OrderDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
    }
}
