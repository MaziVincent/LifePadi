using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Services;
<<<<<<< HEAD
<<<<<<< HEAD
using Api.Interfaces;
=======
>>>>>>> d23f0ab (transaction, order, notification commit)
=======
using Api.Interfaces;
>>>>>>> 37744e4 (i added firebse cloud messaging)
using Api.DTO;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
<<<<<<< HEAD
<<<<<<< HEAD
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


        // [HttpPost("sendgeneral")]
        // public async Task<IActionResult> SendGeneralFcmNotification([FromBody] NotificationRequest request)
        // {
        //      await _fcmService.SendTopicNotificationAsync(request.Topic!, request.Title!, request.Body!);
        //     return Ok();
        // }

        [HttpPost("general")]
        public async Task<IActionResult> SendGeneralNotification([FromBody] NotificationRequest request)
        {
            try{
                var response = await _fcmService.SendGeneralNotification(request);
                return Ok(response);
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
           
=======
        private readonly IHubContext<NotificationHub> _hubContext;
=======
       // private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IFcmService _fcmService;
>>>>>>> 37744e4 (i added firebse cloud messaging)

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
>>>>>>> d23f0ab (transaction, order, notification commit)
        }

    }
}