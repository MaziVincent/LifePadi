using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Api.Services;
using Api.Interfaces;
using Api.DTO;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly IHubContext<LocationHub> _hubContext;
        private readonly IFcmService _fcmService;

        public LocationController(IHubContext<LocationHub> hubContext, IFcmService fcmService)
        {
            _hubContext = hubContext;
            _fcmService = fcmService;
        }

        [HttpPost("rider")]
        public async Task<IActionResult> Post([FromBody] RiderLocation location)
        {
            var response = await _fcmService.SendRiderLocation(location);
            return Ok(new { Response = response });
        }
       

    }
}