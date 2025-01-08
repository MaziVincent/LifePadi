using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Api.Exceptions;
using Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Services
{
    public class OrderService : IOrder
    {
        private readonly DBContext? _dbContext;
        private readonly IMapper _mapper;
        private readonly IFcmService _fcmService;
        // private readonly UpdateOrderAmount updateOrderAmount;
        public OrderService(DBContext dBContext, IMapper mapper, IFcmService fcmService)
        {
            _dbContext = dBContext;
            _mapper = mapper;
            _fcmService = fcmService;
            // updateOrderAmount = new UpdateOrderAmount(dBContext);
        }
        public async Task<PagedList<Order>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Order> orderList = Enumerable.Empty<Order>().AsQueryable();

                var _orders = await _dbContext!.Orders
               .Include(o => o.Customer)
               .Include(o => o.OrderItems)
               .AsSplitQuery()
               .OrderByDescending(o => o.CreatedAt)
               .AsSplitQuery()
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
                newOrder.Order_Id = GenerateCode.generateOrder_Id();
                newOrder.SearchString = newOrder.Status.ToUpper() + " " + newOrder.Type!.ToUpper() + " " + newOrder.Order_Id;
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


        public async Task<PagedList<SingleOrderDto>> customerOrders(int id, SearchPaging props)
        {
            try
            {
                IQueryable<SingleOrderDto> orderList = Enumerable.Empty<SingleOrderDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var normalOrders = await _dbContext!.Orders
                        .Include(o => o.OrderItems)
                        .Include(o => o.Customer)
                        .OrderByDescending(o => o.CreatedAt)
                        .Where(o => o.CustomerId == id)
                        .AsNoTracking()
                        .AsSplitQuery()
                        .ToListAsync();
                    var singleOrderDto = _mapper.Map<List<SingleOrderDto>>(normalOrders);
                    foreach (var item in singleOrderDto)
                    {
                        var delivery = await _dbContext.Deliveries
                        .Include(d => d.Rider)
                        .Include(d => d.DeliveryAddress)
                        .Include(d => d.PickUpAddress)
                        .AsSplitQuery()
                        .FirstOrDefaultAsync(d => d.OrderId == item.Id);
                        if (delivery != null)
                        {
                            item.DeliveryAddress = _mapper.Map<AddressDtoLite>(delivery.DeliveryAddress);
                            item.PickUpAddress = _mapper.Map<AddressDtoLite>(delivery.PickUpAddress);
                            item.Rider = _mapper.Map<RiderDtoLite>(delivery.Rider);
                        }
                        orderList = orderList.Concat(singleOrderDto);
                        var normalResult = PagedList<SingleOrderDto>.ToPagedList(orderList, props.PageNumber, props.PageSize);
                        return normalResult;
                    }
                }
                    var orders = await _dbContext!.Orders
                        .Include(o => o.OrderItems)
                        .Include(o => o.Customer)
                        .OrderByDescending(o => o.CreatedAt)
                        .Where(o => o.CustomerId == id && o.Status!.ToLower().Contains(props.SearchString!.ToLower()))
                        .AsNoTracking()
                        .AsSplitQuery()
                        .ToListAsync();
                    var newSingleOrderDto = _mapper.Map<List<SingleOrderDto>>(orders);
                    foreach (var item in newSingleOrderDto)
                    {
                        var delivery = await _dbContext.Deliveries
                        .Include(d => d.Rider)
                        .Include(d => d.DeliveryAddress)
                        .Include(d => d.PickUpAddress)
                        .AsSplitQuery()
                        .FirstOrDefaultAsync(d => d.OrderId == item.Id);
                        if (delivery != null)
                        {
                            item.DeliveryAddress = _mapper.Map<AddressDtoLite>(delivery.DeliveryAddress);
                            item.PickUpAddress = _mapper.Map<AddressDtoLite>(delivery.PickUpAddress);
                            item.Rider = _mapper.Map<RiderDtoLite>(delivery.Rider);
                        }
                        else
                        {
                                var invalidOrder = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == item.Id);
                                _dbContext.Orders.Remove(invalidOrder!);
                                await _dbContext.SaveChangesAsync();
                            
                        }
                    }
                    orderList = orderList.Concat(newSingleOrderDto);
                    var result = PagedList<SingleOrderDto>.ToPagedList(orderList, props.PageNumber, props.PageSize);
                    return result;
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

        public async Task<SingleOrderDto> getAsync(int id)
        {
            try
            {
                var order = await _dbContext!.Orders.Where(o => o.Id == id)
                    .Include(o => o.Customer)
                    .Include(o => o.Logistics)
                    .Include(o => o.OrderItems)!
                        .ThenInclude(i => i.Product)
                            .ThenInclude(p => p!.Category)
                    .Include(o => o.OrderItems)!
                        .ThenInclude(i => i.Product)
                            .ThenInclude(p => p!.Vendor)
                                .ThenInclude(v => v!.Addresses)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                var delivery = await _dbContext.Deliveries
                .Include(d => d.DeliveryAddress)
                .Include(d => d.PickUpAddress)
                .Include(d => d.Rider).ThenInclude(r => r!.Addresses)
                .AsSplitQuery()
                .FirstOrDefaultAsync(d => d.OrderId == id);
                if (order == null) return null!;
                var OrderDto = _mapper.Map<SingleOrderDto>(order);
                if (delivery != null)
                {
                    OrderDto.DeliveryAddress = _mapper.Map<AddressDtoLite>(delivery.DeliveryAddress);
                    OrderDto.PickUpAddress = _mapper.Map<AddressDtoLite>(delivery.PickUpAddress);
                    OrderDto.DeliveryFee = delivery.DeliveryFee;

                    if (delivery.Rider is not null)
                    {
                        OrderDto.Rider = _mapper.Map<RiderDtoLite>(delivery.Rider);
                        foreach (var item in delivery!.Rider!.Addresses!)
                        {
                            if (item.DefaultAddress == true)
                            {
                                OrderDto.Rider.Longitude = item.Longitude;
                                OrderDto.Rider.Latitude = item.Latitude;
                            }
                        }
                    }

                }
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
                initialOrder.SearchString = order.Status!.ToUpper() + " " + order.Type!.ToUpper() + " " + order.Order_Id;
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
                order.SearchString = status!.ToUpper() + " " + order.Type!.ToUpper() + " " + order.Order_Id;
                _dbContext.Orders.Attach(order);

                if (status == "Completed")
                {
                    var delivery = await _dbContext.Deliveries.FirstOrDefaultAsync(d => d.OrderId == id);
                    delivery!.Status = "Delivered";
                    string Topic = $"order-{order.CustomerId}";
                    string Title = $"Order Completed ";
                    string Body = $"Your Order {order.Order_Id} is delivered and completed. We hope you enjoyed our service";
                    NotificationRequest message = new NotificationRequest
                    {
                        Topic = Topic,
                        Title = Title,
                        Body = Body
                    };
                    await _fcmService.SendGeneralNotification(message);

                }

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
