using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Exceptions
{
    public class ServiceException : Exception
    {
        public ServiceException()
        {
        }
        public ServiceException(string message) : base(message)
        {
        }
        public ServiceException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}