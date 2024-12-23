using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Interfaces;
using Api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Api.Chat
{
    public class ChatHub : Hub
    {
        private readonly IMessageService _messageService;

        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await _messageService.RemoveUser(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public Task RegisterUser(string email)
        {
            return _messageService.RegisterUser(email, Context.ConnectionId);
        }

        public Task SendMessage(Message message)
        {
            return _messageService.SendMessage(message);
        }

        public Task MarkMessageAsRead(int senderId, int messageId)
        {
            var recipient = Context.User?.Identity?.Name; // Assuming authentication
            return recipient != null ? _messageService.MarkMessageAsRead(senderId, int.Parse(recipient), messageId) : Task.CompletedTask;
        }
    }
}