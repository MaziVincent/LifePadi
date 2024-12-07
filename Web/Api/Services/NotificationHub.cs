using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Services
{
    public class NotificationHub : Hub
    {

        public async Task SendNotification(string title, string message)
        {
            // Broadcast to all connected clients
            await Clients.All.SendAsync("ReceiveNotification", title, message);
        }
    }
}
