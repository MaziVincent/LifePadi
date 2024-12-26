using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("history/{senderId}/{recipientId}")]
        public async Task<IActionResult> GetHistory(int senderId, int recipientId)
        {
            try
            {
                var messages = await _messageService.GetChatHistory(senderId, recipientId);
                return Ok(messages);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] Message message)
        {
            try
            {
                if (message.SenderId == 0 || message.RecipientId == 0 || string.IsNullOrEmpty(message.Content))
                {
                    return BadRequest("Invalid message data.");
                }
                await _messageService.SendMessage(message);
                return Ok("Sent message successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("mark-as-read/{Id}")]
        public async Task<IActionResult> MarkAsRead(int Id, [FromQuery] int senderId, int recipientId)
        {
            try
            {
                await _messageService.MarkMessageAsRead(senderId, recipientId, Id);
                return Ok("Marked as read.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("mark-as-delivered/{Id}")]
        public async Task<IActionResult> MarkAsDelivered(int Id)
        {
            try
            {
                await _messageService.MarkAsDelivered(Id);
                return Ok("Marked as delivered.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterMessageUser register)
        {
            try
            {
                if (string.IsNullOrEmpty(register.Email) || string.IsNullOrEmpty(register.ConnectionId))
                {
                    return BadRequest("Invalid user data.");
                }
                await _messageService.RegisterUser(register.Email, register.ConnectionId);
                return Ok("User registered.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}