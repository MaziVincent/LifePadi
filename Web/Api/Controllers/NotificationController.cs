using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Services;
using Api.Interfaces;
using Api.DTO;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
       // private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IFcmService _fcmService;

        public NotificationController(
            // IHubContext<NotificationHub> hubContext,
             IFcmService fcmService)
        {
           // _hubContext = hubContext;
            _fcmService = fcmService;
        }

        // [HttpPost("signal")]
        // public async Task<IActionResult> SendNotification([FromBody] NotificationRequest request)
        // {
        //     await _hubContext.Clients.All.SendAsync("ReceiveNotification", request.Title, request.Message);
        //     return Ok();
        // }


    [HttpPost("send")]
        public async Task<IActionResult> SendFcmNotification([FromBody] NotificationRequest request)
        {
            var response = await _fcmService.SendNotificationAsync(request.Token!, request.Title!, request.Body!);
            return Ok(new { Response = response });
        }


        [HttpPost("sendgeneral")]
        public async Task<IActionResult> SendGeneralFcmNotification([FromBody] NotificationRequest request)
        {
             await _fcmService.SendTopicNotificationAsync(request.Topic!, request.Title!, request.Body!);
            return Ok();
        }

    }
}