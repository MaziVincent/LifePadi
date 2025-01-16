using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Interfaces;
using Api.Models;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class DashboardService : IDashboard
    {
        public readonly  DBContext _dbContext;
        public DashboardService( DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<object>GetDashboardData()
        {
            var data = new
            {
                TotalCustomers = await _dbContext.Customers.CountAsync(),
                TotalProductCategories = await _dbContext.Categories.CountAsync(),
                TotalOrders = await _dbContext.Orders.CountAsync(),
                TotalPendingOrders = await _dbContext.Orders.Where(x => x.Status == "Pending").CountAsync(),
                TotalCompletedOrders = await _dbContext.Orders.Where(x => x.Status == "Completed").CountAsync(),
                TotalOngoingOrders = await _dbContext.Orders.Where(x => x.Status == "Ongoing").CountAsync(),
                TotalCancelledOrders = await _dbContext.Orders.Where(x => x.Status == "Cancelled").CountAsync(),
                TotalVendors = await _dbContext.Vendors.CountAsync(),
                TotalRiders = await _dbContext.Riders.CountAsync(),
                TotalServices = await _dbContext.Services.CountAsync(),
                TotalVouchers = await _dbContext.Vouchers.CountAsync(),
                TotalTransactions = await _dbContext.Transactions.CountAsync(),


            };
            return data;
        }
    }
}