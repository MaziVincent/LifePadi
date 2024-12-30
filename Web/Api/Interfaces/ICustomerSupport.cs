using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;

namespace Api.Interfaces
{
    public interface ICustomerSupport
    {

        public Task<IEnumerable<CustomerSupportDto>> allAsync();
        public Task<string> createAsync(CustomerSupportDto support);
        public Task<string> SendEmailAsync(EmailDto email);
    }
}