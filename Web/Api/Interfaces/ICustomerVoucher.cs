using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;

namespace Api.Interfaces
{
    public interface ICustomerVoucher
    {
        public Task<CustomerVoucherDto> CreateAsync(CustomerVoucherDto customerVoucherDto);
        public Task<CustomerVoucherDto> UpdateAsync(CustomerVoucherDto customerVoucherDto, int id);
        public Task<string> DeleteAsync(int id);
        public Task<CustomerVoucherDto> GetAsync(int id);
        public Task<IEnumerable<CustomerVoucherDto>> AllAsync();
    }
}