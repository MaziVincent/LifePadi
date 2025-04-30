using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Api.Exceptions
{
    public class ServiceException : Exception
    {
        public object? Details { get; }
        public ServiceException()
        {
        }
        public ServiceException(string message) : base(message)
        {
        }

        public ServiceException(object details) : base(JsonSerializer.Serialize(details))
        {
            Details = details;
        }

        public ServiceException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}