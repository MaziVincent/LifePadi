using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.EntityFrameworkCore;


namespace Api.Services
{
    public class UpdateOrderAmount
    {
         private readonly DBContext? _dbContext;
        
        public UpdateOrderAmount(DBContext dBContext)
        {
            _dbContext = dBContext;
        }
            
    

        public async void OrderAmount () {

            var ordersToUpdate = await _dbContext!.Orders.Include(o => o.OrderItems) // Include related OrderItems
                    .Where(o => o.TotalAmount == null || o.TotalAmount == 0)
                    .ToListAsync();

                foreach (var order in ordersToUpdate)
                {
                    // Calculate totalAmount for the order
                    var totalAmount = order.OrderItems!.Sum(oi => oi.Quantity * oi.Amount);

                    // Update the order's totalAmount
                    order.TotalAmount = totalAmount;

                    Console.WriteLine($"Updated OrderId {order.Id} with TotalAmount {totalAmount}");
                }
        }
    }
}