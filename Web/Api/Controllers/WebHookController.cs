using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using Api.DTO;
using Newtonsoft.Json;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebHookController : ControllerBase
    {
        private readonly ILogger<WebHookController> _logger;
        private readonly IWebHookService _webhookService;

        public WebHookController(ILogger<WebHookController> logger, IWebHookService webHookService)
        {
            _logger = logger;
            _webhookService = webHookService;
        }

        [HttpPost("paystack-webhook")]
        public async Task<IActionResult> HandleWebhook()
        {
            try
            {
                string json = await new StreamReader(Request.Body).ReadToEndAsync();
                string paystackSignature = Request.Headers["x-paystack-signature"]!;

                if (!await _webhookService.ValidateSignature(json, paystackSignature))
                {
                    _logger.LogWarning("Invalid Paystack webhook signature");
                    return BadRequest("Invalid signature");
                }

                var paystackEvent = JsonConvert.DeserializeObject<PaystackWebhookEvent>(json);
                await _webhookService.ProcessWebhookEvent(paystackEvent!);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing Paystack webhook");
                return StatusCode(500, "Internal server error");
            }



        }
    }
}