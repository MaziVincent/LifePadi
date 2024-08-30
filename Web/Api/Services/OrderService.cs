using Api.DTO;
using Api.Interfaces;
using Api.Models;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
<<<<<<< HEAD
using Api.Exceptions;
using Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
=======
>>>>>>> 28d4101 (finished with rider and order)
=======
using Api.Exceptions;
>>>>>>> 52db56c (made some changes in the delivery and order)

namespace Api.Services
{
    public class OrderService : IOrder
    {
        private readonly DBContext? _dbContext;
        private readonly IMapper _mapper;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        public OrderService( DBContext dBContext, IMapper mapper)
=======
        public OrderService(DBContext dBContext, IMapper mapper)
>>>>>>> 98415b4 (done with dashboard)
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

<<<<<<< HEAD
        public async Task<IEnumerable<OrderDTOLite>> allOrderLite()
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<IEnumerable<OrderDtoLite>> allOrderLite()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var orders = await _dbContext!.Orders.OrderByDescending(o => o.CreatedAt).ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var OrderDtoLite = _mapper.Map<List<OrderDtoLite>>(orders);
                return OrderDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
<<<<<<< HEAD
            }
        }

        public async Task<OrderDto> createAsync(OrderDto order)
=======
                var orderDTOLite = _mapper.Map<List<OrderDTOLite>>(orders);
                return orderDTOLite;
=======
                var OrderDtoLite = _mapper.Map<List<OrderDtoLite>>(orders);
                return OrderDtoLite;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
=======
>>>>>>> 52db56c (made some changes in the delivery and order)
            }
        }

<<<<<<< HEAD
        public async Task<OrderDTO> createAsync(OrderDTO order)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<OrderDto> createAsync(OrderDto order)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var newOrder = _mapper.Map<Order>(order);
                newOrder.Status = "Pending";
<<<<<<< HEAD
<<<<<<< HEAD
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

                        var transaction = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == item.Id);
                        if(transaction != null){
                            item.PaymentChannel = transaction.PaymentChannel;
                        }
                    }
                    orderList = orderList.Concat(singleOrderDto);
                    var normalResult = PagedList<SingleOrderDto>.ToPagedList(orderList, props.PageNumber, props.PageSize);
                    return normalResult;
                }
=======
=======
                if (order.Type is null){
                    newOrder.Type = "Normal";
                }else{
                    newOrder.Type = order.Type;
                }
>>>>>>> 52db56c (made some changes in the delivery and order)
                newOrder.IsDelivered = false;
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
        

        public async Task<PagedList<Order>> customerOrders(int id, SearchPaging props)
        {
            try
            {
<<<<<<< HEAD
>>>>>>> 28d4101 (finished with rider and order)
=======
                IQueryable<Order> orderList = Enumerable.Empty<Order>().AsQueryable();

>>>>>>> 7fa87ff (user dashboard commit)
                var orders = await _dbContext!.Orders
                    .Include(o => o.OrderItems)
                    .Include(o => o.Customer)
                    .OrderByDescending(o => o.CreatedAt)
<<<<<<< HEAD
<<<<<<< HEAD
                    .Where(o => o.CustomerId == id && o.Status!.ToLower().Contains(props.SearchString.ToLower()))
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
                }
                orderList = orderList.Concat(newSingleOrderDto);
                var result = PagedList<SingleOrderDto>.ToPagedList(orderList, props.PageNumber, props.PageSize);
                return result;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
=======
                    .Where(o => o.CustomerId == customerId)
=======
                    .Where(o => o.CustomerId == id)
>>>>>>> 7fa87ff (user dashboard commit)
                    .ToListAsync();
                orderList = orderList.Concat(orders);
                var result = PagedList<Order>.ToPagedList(orderList, props.PageNumber, props.PageSize);
                return result;
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
                throw new Exception(ex.Message);
>>>>>>> 28d4101 (finished with rider and order)
=======
                throw new ServiceException(ex.Message);
>>>>>>> 52db56c (made some changes in the delivery and order)
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
<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
<<<<<<< HEAD
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
                    OrderDto.DeliveryAddress = _mapper.Map<AddressDtoLite>( delivery.DeliveryAddress);
                    OrderDto.PickUpAddress = _mapper.Map<AddressDtoLite> (delivery.PickUpAddress);
                    OrderDto.DeliveryFee = delivery.DeliveryFee;

                    if (delivery.Rider is not null) {
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
=======
            }catch(Exception ex)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
=======
>>>>>>> 52db56c (made some changes in the delivery and order)
            }
        }

        public async Task<OrderDto> getAsync(int id)
        {
            try
            {
                var order = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (order == null) return null!;
                var OrderDto = _mapper.Map<OrderDto>(order);
                return OrderDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<OrderItemDTOLite>> orderItemLites(int id)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<IEnumerable<OrderItemDtoLite>> orderItemLites(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var order = await _dbContext!.Orders
                    .Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
<<<<<<< HEAD
<<<<<<< HEAD
                var orderItems = _mapper.Map<List<OrderItemDtoLite>>(order!.OrderItems);
                return orderItems;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
<<<<<<< HEAD
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
=======
                var orderItems = _mapper.Map<List<OrderItemDTOLite>>(order!.OrderItems);
=======
                var orderItems = _mapper.Map<List<OrderItemDtoLite>>(order!.OrderItems);
>>>>>>> 836ec36 (changed all DTO to Dto)
                return orderItems;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
=======
>>>>>>> 52db56c (made some changes in the delivery and order)
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

<<<<<<< HEAD
        public async Task<OrderDTO> updateAsync(OrderDTO order, int id)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<OrderDto> updateAsync(OrderDto order, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var initialOrder = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (initialOrder == null) return null!;
                initialOrder.Status = order.Status;
                initialOrder.CustomerId = order.CustomerId;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                initialOrder.RiderId = order.RiderId;
=======
>>>>>>> 4641615 (finished with delivery service and controller)
                initialOrder.UpdatedAt = DateTime.UtcNow;
                initialOrder.IsDelivered = order.IsDelivered;
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

<<<<<<< HEAD
        public async Task<OrderDTO> updateOrderStatus(int id, string status)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<OrderDto> updateOrderStatus(int id, string status)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var order = await _dbContext!.Orders.FirstOrDefaultAsync(o => o.Id == id);
                if (order == null) return null!;
                order.Status = status;
<<<<<<< HEAD
                order.SearchString = status!.ToUpper() + " " + order.Type!.ToUpper() + " " + order.Order_Id;
                _dbContext.Orders.Attach(order);

                if(status == "Completed"){
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
=======
                _dbContext.Orders.Attach(order);
                await _dbContext.SaveChangesAsync();
                var OrderDto = _mapper.Map<OrderDto>(order);
                return OrderDto;
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
                throw new Exception(ex.Message);
>>>>>>> 28d4101 (finished with rider and order)
=======
                throw new ServiceException(ex.Message);
>>>>>>> 52db56c (made some changes in the delivery and order)
            }
        }
    }
}
