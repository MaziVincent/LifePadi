using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;

namespace Api.Interfaces
{
    public interface IMessageService
    {
        Task SendMessage(Message message);
        Task<List<MessageDto>> GetChatHistory(int user1, int user2);
        Task MarkAsDelivered(int messageId);
        Task MarkMessageAsRead(int senderId, int recipientId, int messageId);
        Task RemoveUser(string connectionId);
        Task RegisterUser(string email, string connectionId);
    }
}