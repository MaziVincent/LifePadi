using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Interfaces
{
    public interface IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection);
    }
}
