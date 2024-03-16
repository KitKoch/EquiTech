using Models;
using Models.Domain.Messages;
using Models.Requests.Messages;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IMessageService
    {
        Task<string> UserConnected(int userId, string connectionId);
        string GetConnectionByUserId(int userId);
        void UserDisconnected(int userId);
        int Add(MessageAddRequest model, int userId);
        void Delete(int id);
        MessageModel GetById(int msgId);
        List<MessageModel> GetUsersThread(int user1, int user2);
        Paged<MessageModel> Pagination(int page, int pageSize);
        Paged<MessageModel> PaginationByRecipientId(int page, int pageSize, int recipientId);
        Paged<MessageModel> PaginationBySenderId(int page, int pageSize, int senderId);
        void Update(MessageUpdateRequest model, int userId);
        void UpdateReadDate(int msgId, int userId);
    }
}