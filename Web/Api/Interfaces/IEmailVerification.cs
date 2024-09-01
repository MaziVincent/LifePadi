using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IEmailVerification
    {
        public Task SendEmailAsync(string to, string subject, string body);
    }
}