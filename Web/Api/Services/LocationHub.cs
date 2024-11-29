using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    using Microsoft.AspNetCore.SignalR;

    public class LocationHub : Hub
    {
        // Rider sends location updates
        public async Task UpdateLocation(string riderId, double latitude, double longitude)
        {
            // Broadcast location to a specific user group
            await Clients.Group(riderId).SendAsync("LocationUpdated", latitude, longitude);
        }

        // User subscribes to rider's updates
        public async Task SubscribeToRider(string riderId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, riderId);
        }

        // Unsubscribe user when they leave tracking
        public async Task UnsubscribeFromRider(string riderId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, riderId);
        }
    }
}