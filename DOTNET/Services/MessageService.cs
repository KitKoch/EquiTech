using Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Requests.Messages;
using Data;
using Models;
using Models.Domain.Messages;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Drawing.Printing;

namespace Services
{
    public class MessageService : IMessageService
    {
        private static IDataProvider _data = null;

        private static Dictionary<int, string> _connectUsers = new Dictionary<int, string>();
        public MessageService(IDataProvider data)
        {
            _data = data;
        }
        public Task<string> UserConnected(int userId, string connectionId)
        {
            if (_connectUsers.ContainsKey(userId))
            {
                _connectUsers[userId] = connectionId;
            }
            _connectUsers.Add(userId, connectionId);

            return Task.FromResult(connectionId);
        }
        public string GetConnectionByUserId(int userId)
        {
            string connection = _connectUsers.GetValueOrDefault(userId);

            if (connection == null)
            { return null; }
            else
            {
                return connection;
            }
        }
        public void UserDisconnected(int userId)
        {
            _connectUsers.Remove(userId);
        }
        public int Add(MessageAddRequest model, int userId)
        {
            string procName = "[dbo].[Messages_Insert]";

            int id = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(model, collection);
                collection.AddWithValue("@SenderId", userId);
                collection.AddWithValue("@RecipientId", model.RecipientId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                collection.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }
        public void Update(MessageUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Messages_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                AddCommonParams(model, paramCollection);
                paramCollection.AddWithValue("@Id", model.Id);
                paramCollection.AddWithValue("@CurrentUserId", userId);
            },
            returnParameters: null);
        }
        public void UpdateReadDate(int msgId, int userId)
        {
            string procName = "[dbo].[Messages_Update_DateRead]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", msgId);
                paramCollection.AddWithValue("@CurrentUserId", userId);
            },
            returnParameters: null);
        }
        public MessageModel GetById(int msgId)
        {
            string procName = "[dbo].[Messages_Select_ById]";
            MessageModel msg = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", msgId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    msg = MessageMapper(reader, ref index);
                }
                );
            return msg;
        }
        public List<MessageModel> GetUsersThread(int user1, int user2)
        {
            List<MessageModel> list = null;

            int totalCount = 0;

            string procName = "[dbo].[Messages_Select_Thread]";
            _data.ExecuteCmd(procName,
            (param) =>
            {
                param.AddWithValue("@User1", user1);
                param.AddWithValue("@User2", user2);
            }, (reader, recordSetIndex) =>
            {
                int index = 0;
                MessageModel msg = MessageMapper(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index);
                }
                if (list == null)
                {
                    list = new List<MessageModel>();
                }
                list.Add(msg);
            });
            return list;
        }
        public Paged<MessageModel> Pagination(int page, int pageSize)
        {
            Paged<MessageModel> pagedList = null;
            List<MessageModel> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Messages_SelectAll]";

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", page);
                    param.AddWithValue("@PageSize", pageSize);
                }, (reader, recordSetIndex) =>
                {
                    int index = 0;
                    MessageModel msg = MessageMapper(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }
                    if (list == null)
                    {
                        list = new List<MessageModel>();
                    }
                    list.Add(msg);
                });

            if (list != null)
            {
                pagedList = new Paged<MessageModel>(list, page, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<MessageModel> PaginationByRecipientId(int page, int pageSize, int recipientId)
        {
            Paged<MessageModel> pagedList = null;
            List<MessageModel> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Messages_Select_ByRecipientId]";

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", page);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@RecipientId", recipientId);

                }, (reader, recordSetIndex) =>
                {
                    int index = 0;
                    MessageModel msg = MessageMapper(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }
                    if (list == null)
                    {
                        list = new List<MessageModel>();
                    }
                    list.Add(msg);
                });

            if (list != null)
            {
                pagedList = new Paged<MessageModel>(list, page, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<MessageModel> PaginationBySenderId(int page, int pageSize, int senderId)
        {
            Paged<MessageModel> pagedList = null;
            List<MessageModel> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Messages_Select_BySenderId]";

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", page);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@SenderId", senderId);
                }, (reader, recordSetIndex) =>
                {
                    int index = 0;
                    MessageModel msg = MessageMapper(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }
                    if (list == null)
                    {
                        list = new List<MessageModel>();
                    }
                    list.Add(msg);
                });

            if (list != null)
            {
                pagedList = new Paged<MessageModel>(list, page, pageSize, totalCount);
            }
            return pagedList;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Messages_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, returnParameters: null);
        }
        private static void AddCommonParams(MessageAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Message", model.Message);
            collection.AddWithValue("@Subject", model.Subject);
        }
        private static MessageModel MessageMapper(IDataReader reader, ref int index)
        {
            MessageModel msg = new MessageModel();
            msg.Id = reader.GetSafeInt32(index++);
            msg.Message = reader.GetSafeString(index++);
            msg.Subject = reader.GetSafeString(index++);
            msg.RecipientId = reader.GetSafeInt32(index++);
            msg.SenderId = reader.GetSafeInt32(index++);
            msg.DateSent = reader.GetSafeDateTime(index++);
            msg.DateRead = reader.GetSafeDateTime(index++);
            msg.DateModified = reader.GetSafeDateTime(index++);
            msg.DateCreated = reader.GetSafeDateTime(index++);

            return msg;
        }
    }
}
