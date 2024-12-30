using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;

namespace Api.Interfaces
{
    public interface IFcmService
    {
        public Task<string> SendNotificationAsync(string targetToken, string title, string body);
        public Task SendTopicNotificationAsync(string topic, string title, string body);
        public  Task<object> SendGeneralNotification(NotificationRequest message);
        public Task<object> SendRiderLocation(RiderLocation location);
    }
}