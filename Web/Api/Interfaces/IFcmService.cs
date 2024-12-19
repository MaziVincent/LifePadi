using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
<<<<<<< HEAD
<<<<<<< HEAD
using Api.DTO;
=======
>>>>>>> 37744e4 (i added firebse cloud messaging)
=======
using Api.DTO;
>>>>>>> 0ca0962 (notification, location and other commits)

namespace Api.Interfaces
{
    public interface IFcmService
    {
        public Task<string> SendNotificationAsync(string targetToken, string title, string body);
        public Task SendTopicNotificationAsync(string topic, string title, string body);
<<<<<<< HEAD
<<<<<<< HEAD
        public  Task<object> SendGeneralNotification(NotificationRequest message);
        public Task<object> SendRiderLocation(RiderLocation location);
=======
>>>>>>> 37744e4 (i added firebse cloud messaging)
=======
        public  Task<object> SendGeneralNotification(NotificationRequest message);
        public Task<object> SendRiderLocation(RiderLocation location);
>>>>>>> 0ca0962 (notification, location and other commits)
    }
}