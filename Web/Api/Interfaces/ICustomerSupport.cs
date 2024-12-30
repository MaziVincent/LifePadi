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
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<string> SendEmailAsync(EmailDto email);
=======
>>>>>>> 9391cc8 (faq, customer support and term)
=======
        public Task<string> SendEmailAsync(EmailDto email);
>>>>>>> 6b6a266 (search commit)
    }
}