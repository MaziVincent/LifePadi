using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Interfaces;
using Api.DTO;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class CustomerVoucherService : ICustomerVoucher
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public CustomerVoucherService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CustomerVoucherDto> CreateAsync(CustomerVoucherDto customerVoucher)
        {
            try
            {
                var initialCustomerVoucher = await _context.CustomerVouchers.FirstOrDefaultAsync(cv => cv.CustomerId == customerVoucher.CustomerId && cv.VoucherId == customerVoucher.VoucherId);
                if (initialCustomerVoucher != null)
                {
                    throw new Exceptions.ServiceException("Customer already use this voucher");
                }
                var newCustomerVoucher = _mapper.Map<CustomerVoucher>(customerVoucher);
                _context.CustomerVouchers.Add(newCustomerVoucher);
                _context.SaveChanges();
                return _mapper.Map<CustomerVoucherDto>(newCustomerVoucher);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> DeleteAsync(int id)
        {
            try
            {
                var customerVoucher = await _context.CustomerVouchers.FirstOrDefaultAsync(cv => cv.Id == id);
                if (customerVoucher == null)
                {
                    throw new Exceptions.ServiceException("Customer Voucher not found");
                }
                _context.CustomerVouchers.Remove(customerVoucher);
                _context.SaveChanges();
                return "Customer Voucher deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task<CustomerVoucherDto> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CustomerVoucherDto>> AllAsync()
        {
            try
            {
                var customerVouchers = await _context.CustomerVouchers
                .Include(cv => cv.Customer)
                .Include(cv => cv.Voucher)
                .ToListAsync();
                return _mapper.Map<IEnumerable<CustomerVoucherDto>>(customerVouchers);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task<CustomerVoucherDto> UpdateAsync(CustomerVoucherDto customerVoucher, int id)
        {
            throw new NotImplementedException();
        }
        
    }
}