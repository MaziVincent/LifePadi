using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Chat;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class MessageService : IMessageService
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        private readonly IHubContext<ChatHub> _hubContext;
        private static readonly Dictionary<string, string> UserConnections = new();
        private readonly ILogger<MessageService> _logger;

        public MessageService(DBContext context, IHubContext<ChatHub> hubContext, IMapper mapper, ILogger<MessageService> logger)
        {
            _context = context;
            _hubContext = hubContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<MessageDto>> GetChatHistory(int user1, int user2)
        {
            try
            {
                var messages = await _context.Messages
                    .Where(m => (m.SenderId == user1 && m.RecipientId == user2) ||
                                (m.SenderId == user2 && m.RecipientId == user1))
                    .Include(m => m.Sender)
                    .Include(m => m.Recipient)
                    .OrderByDescending(m => m.CreatedAt)
                    .AsSplitQuery()
                    .ToListAsync();

                return _mapper.Map<List<MessageDto>>(messages);

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task MarkAsDelivered(int messageId)
        {
            try
            {
                var message = await _context.Messages.FindAsync(messageId);
                if (message != null && !message.IsDelivered)
                {
                    message.IsDelivered = true;
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task MarkMessageAsRead(int senderId, int recipientId, int messageId)
        {
            try
            {
                // Update message read status in the database
                var message = await _context.Messages
                    .Where(m => m.SenderId == senderId && m.RecipientId == recipientId && m.Id == messageId && !m.IsRead)
                    .FirstOrDefaultAsync();

                if (message != null)
                {
                    message.IsRead = true;
                    _context.Messages.Update(message);
                    await _context.SaveChangesAsync();  // Commit the changes to DB
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task RegisterUser(string email, string connectionId)
        {
            try
            {
                if (!UserConnections.ContainsKey(email))
                {
                    UserConnections[email] = connectionId;
                }
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task RemoveUser(string connectionId)
        {
            try
            {
                var user = UserConnections.FirstOrDefault(x => x.Value == connectionId).Key;
                if (user != null)
                {
                    UserConnections.Remove(user);
                }
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task SendMessage(Message message)
        {
            try
            {
                PrepareMessage(message);  // Prepare the message

                // Save the message to the database
                await SaveMessageToDatabaseAsync(message);

                // If the recipient is connected, send the message via SignalR
                await DeliverMessageToRecipientAsync(message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while sending the message.");
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        private static void PrepareMessage(Message message)
        {
            message.CreatedAt = DateTime.UtcNow;
            message.UpdatedAt = DateTime.UtcNow;
            message.IsDelivered = false;
            message.IsRead = false;
        }

        private async Task SaveMessageToDatabaseAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }

        private async Task DeliverMessageToRecipientAsync(Message message)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == message.RecipientId);
            if (user == null) return;
            if (UserConnections.TryGetValue(user.Email!, out var recipientConnectionId))
            {
                await _hubContext.Clients.Client(recipientConnectionId).SendAsync("ReceiveMessage", message);

                // Update delivery status
                message.IsDelivered = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}