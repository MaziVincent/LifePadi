using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Interfaces;

namespace Api.Chat
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public string GetUserId(Microsoft.AspNetCore.SignalR.HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        }
    }
}