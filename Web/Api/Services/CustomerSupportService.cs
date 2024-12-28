using System;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class CustomerSupportService : ICustomerSupport
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;

        public CustomerSupportService(DBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CustomerSupportDto>> allAsync()
        {
            try
            {
                var supports = await _dbContext.CustomerSupports
                    .Include(c => c.Customer)
                    .OrderByDescending(a => a.CreatedAt).ToListAsync();
                var customerSupports = _mapper.Map<List<CustomerSupportDto>>(supports);
                return customerSupports;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> createAsync(CustomerSupportDto support)
        {

            try
            {
                
                var newSupport = _mapper.Map<CustomerSupport>(support);
                await _dbContext.CustomerSupports.AddAsync(newSupport);
                await _dbContext.SaveChangesAsync();
                return "Message sent Successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}