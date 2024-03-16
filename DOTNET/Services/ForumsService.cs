using Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Forums;
using System.Reflection;
using Stripe.Terminal;
using Models.Domain.Blogs;
using Models;
using Models.Requests.Users;
using Data;
using Stripe;
using Models.Requests.Forums;
using Services.Interfaces;
using Models.Domain.Threads;
using Models.Requests.Threads;
using Models.Domain.Users;
using Models.Domain;
using Newtonsoft.Json;

namespace Services
{
    public class ForumsService : IForumsService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;
        private ILookUpService _lookUpService = null;
        IBaseUserMapper _baseUserMapper = null;

        public ForumsService(IAuthenticationService<int> authSerice
            , IDataProvider dataProvider
            , ILookUpService lookUpService
            , IBaseUserMapper baseUserMapper)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
            _lookUpService = lookUpService;
            _baseUserMapper = baseUserMapper;
        }

        #region Forums
        public List<ForumMain> SelectAllForumByCategory()
        {
            string procName = "[dbo].[Forums_SelectAllByCategory]";
            List<ForumMain> list = null;
            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                { },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    ForumMain forumMain = ForumMainMapper(reader, ref startingIndex);
                    if (list == null)
                    {
                        list = new List<ForumMain>();
                    }
                    list.Add(forumMain);
                }
                );
            return list;
        }
        public Paged<Forum> GetAllForums(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Forums_SelectAll]";
            int totalCount = 0;
            List<Forum> list = null;
            Paged<Forum> pagedResult = null;

            _dataProvider.ExecuteCmd(
               procName,
               inputParamMapper: (paramCol) =>
               {
                   paramCol.AddWithValue("@PageIndex", pageIndex);
                   paramCol.AddWithValue("@PageSize", pageSize);
               },
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int idx = 0;
                   Forum model = MapSingleForum(reader, ref idx);

                   if (totalCount == 0)
                   {
                       totalCount = reader.GetSafeInt32(idx++);
                   }

                   if (list == null)
                   {
                       list = new List<Forum>();
                   }
                   list.Add(model);
               });
            if (list != null)
            {
                pagedResult = new Paged<Forum>(list, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Forum> GetForumsBySearchPagination(string query, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Forums_SearchPaginated]";
            int totalCount = 0;
            List<Forum> list = null;
            Paged<Forum> pagedResult = null;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: (paramCol) =>
                {
                    paramCol.AddWithValue("@Query", query);
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                    paramCol.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: (reader, set) =>
                {
                    int idx = 0;

                    Forum forum = MapSingleForum(reader, ref idx);

                    if (list == null)
                        list = new List<Forum>();

                    list.Add(forum);
                });


            if (list != null)
            {
                pagedResult = new Paged<Forum>(list, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Forum> GetForumsByCategoryPaginated(int categoryId, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Forums_SelectByCategoryPaginatedV2]";
            int totalCount = 0;
            List<Forum> forums = null;
            Paged<Forum> pagedResult = null;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: (paramCol) =>
                {
                    paramCol.AddWithValue("@ForumCategoryId", categoryId);
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                    paramCol.AddWithValue("@PageSize", pageSize);

                },
                singleRecordMapper: (reader, set) =>
                {
                    int startingIndex = 0;
                    Forum forum = MapSingleForum(reader, ref startingIndex);

                    if (forums == null)
                        forums = new List<Forum>();

                    forums.Add(forum);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }
                });
            if (forums != null)
            {
                pagedResult = new Paged<Forum>(forums, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public int CreateForum(ForumAddRequest model)
        {
            int forumId = 0;
            string procName = "[dbo].[Forums_Insert]";

            _dataProvider.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    AddForumCommonParams(model, paramCol);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    paramCol.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out forumId);
                });

            return forumId;
        }

        public Forum GetForumById(int id)
        {
            string procName = "[dbo].[Forums_SelectById]";
            Forum model = null;

            _dataProvider.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    model = MapSingleForum(reader, ref startingIndex);
                });

            return model;
        }

        public void UpdateForum(ForumUpdateRequest model)
        {
            string procName = "[dbo].[Forums_Update]";

            _dataProvider.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    AddForumCommonParams(model, paramCol);
                    paramCol.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public void DeleteForum(int id)
        {
            string procName = "[dbo].[Forums_Delete]";

            _dataProvider.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }
        #endregion

        #region Threads

        public void UpdateThread(ThreadUpdateRequest model)
        {
            string procName = "[dbo].[Threads_Update]";

            _dataProvider.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddThreadCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public void DeleteThread(int id)
        {
            string procName = "dbo.Threads_Update_IsDeleted";

            _dataProvider.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        public Paged<Thread> GetThreadsByCreatedBy(int createdBy, int pageSize, int pageIndex)
        {
            string procName = "dbo.Threads_Select_ByCreatedBy";
            int totalCount = 0;
            List<Thread> list = null;
            Paged<Thread> pagedResult = null;

            _dataProvider.ExecuteCmd(
                procName,
                inputParamMapper: (paramCol) =>
                {
                    paramCol.AddWithValue("@CreatedBy", createdBy);
                    paramCol.AddWithValue("@PageSize", pageSize);
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                },
                singleRecordMapper: (reader, set) =>
                {
                    int startingIndex = 0;
                    Thread thread = MapThread(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }

                    if (list == null)
                    {
                        list = new List<Thread>();
                    }
                    list.Add(thread);
                });

            if (list != null)
            {
                pagedResult = new Paged<Thread>(list, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public List<Thread> GetThreadsByForumId(int forumId)
        {
            string procName = "dbo.Threads_SelectByForumId";
            List<Thread> list = null;
            List<Thread> nestedThreads = null;

            _dataProvider.ExecuteCmd(
                procName,
                inputParamMapper: (paramCol) =>
                {
                    paramCol.AddWithValue("@ForumId", forumId);
                },
                singleRecordMapper: (reader, set) =>
                {
                    int startingIndex = 0;
                    Thread thread = MapThread(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<Thread>();
                    }
                    list.Add(thread);
                });
            if (list != null)
            {
                nestedThreads = GetNestedThreads(list);
            }
            return nestedThreads;
        }

        public Paged<Thread> GetThreadsByParentId(int parentId, int pageSize, int pageIndex)
        {
            string procName = "dbo.Threads_SelectByParentId";
            int totalCount = 0;
            List<Thread> list = new List<Thread>();
            Paged<Thread> pagedResult = null;
            List<Thread> nestedThreads = null;

            _dataProvider.ExecuteCmd(
                procName,
                inputParamMapper: (paramCol) =>
                {
                    paramCol.AddWithValue("@ParentId", parentId);
                    paramCol.AddWithValue("@PageSize", pageSize);
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                },
                singleRecordMapper: (reader, set) =>
                {
                    int startingIndex = 0;
                    Thread thread = MapThread(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }

                    list.Add(thread);
                });
            if (list != null)
            {
                nestedThreads = GetNestedThreads(list);
                pagedResult = new Paged<Thread>(nestedThreads, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public List<Thread> GetNestedThreads(List<Thread> threads)
        {
            List<Thread> nestedThreads = new List<Thread>();
            Dictionary<int, Thread> topLevelThreads = new Dictionary<int, Thread>();
            List<Thread> replies = new List<Thread>();

            if (threads != null)
            {

                foreach (Thread thread in threads)
                {
                    if (thread.ParentThreadId == 0)
                    {
                        topLevelThreads.Add(thread.Id, thread);
                    }
                    else
                    {
                        replies.Add(thread);
                    }
                }

                foreach (Thread reply in replies)
                {
                    if (topLevelThreads.ContainsKey(reply.ParentThreadId))
                    {
                        topLevelThreads[reply.ParentThreadId].Replies ??= new List<Thread>();
                        topLevelThreads[reply.ParentThreadId].Replies.Add(reply);
                    }
                }

            }

            nestedThreads = topLevelThreads.Select(item => item.Value).ToList();
            nestedThreads.Reverse();

            return nestedThreads;
        }

        public int CreateThread(ThreadAddRequest model)
        {
            string procName = "[dbo].[Threads_Insert]";
            int threadId = 0;

            _dataProvider.ExecuteNonQuery(
                procName,
                inputParamMapper: (paramCol) =>
                {
                    AddThreadCommonParams(model, paramCol);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    paramCol.Add(idOut);
                },
                returnParameters: (returnCol) =>
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out threadId);
                });

            return threadId;
        }

        #endregion

        private ForumMain ForumMainMapper(IDataReader reader, ref int startingIndex)
        {
            ForumMain forumMain = new ForumMain();

            forumMain.Id = reader.GetSafeInt32(startingIndex++);
            forumMain.Name = reader.GetSafeString(startingIndex++);

            string json = reader.GetSafeString(startingIndex++);
            if (!string.IsNullOrEmpty(json))
            {
                forumMain.Forums = JsonConvert.DeserializeObject<List<Forum>>(json);
            }
            return forumMain;
        }

        private Thread MapThread(IDataReader reader, ref int startingIndex)
        {
            Thread thread = new Thread();

            thread.Id = reader.GetSafeInt32(startingIndex++);
            thread.Subject = reader.GetString(startingIndex++);
            thread.Content = reader.GetString(startingIndex++);
            thread.ForumId = reader.GetSafeInt32(startingIndex++);
            thread.IsDeleted = reader.GetSafeBool(startingIndex++);
            thread.DateCreated = reader.GetSafeDateTime(startingIndex++);
            thread.DateModified = reader.GetSafeDateTime(startingIndex++);
            thread.Author = _baseUserMapper.MapUser(reader, ref startingIndex);
            thread.ParentThreadId = reader.GetSafeInt32(startingIndex++);
            thread.ForumName = reader.GetSafeString(startingIndex++);

            return thread;
        }

        private Forum MapSingleForum(IDataReader reader, ref int startingIndex)
        {
            Forum model = new Forum();

            model.Id = reader.GetSafeInt32(startingIndex++);
            model.Name = reader.GetSafeString(startingIndex++);
            model.Description = reader.GetSafeString(startingIndex++);
            model.ForumCategory = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            model.IsPrivate = reader.GetSafeBool(startingIndex++);
            model.IsClosed = reader.GetSafeBool(startingIndex++);
            model.DateCreated = reader.GetSafeDateTime(startingIndex++);
            model.DateModified = reader.GetSafeDateTime(startingIndex++);

            return model;
        }

        private static void AddThreadCommonParams(ThreadAddRequest model, SqlParameterCollection paramCol)
        {
            paramCol.AddWithValue("@Subject", model.Subject);
            paramCol.AddWithValue("@Content", model.Content);
            paramCol.AddWithValue("@ForumId", model.ForumId);
            paramCol.AddWithValue("@ParentId", model.ParentId);
            paramCol.AddWithValue("@CreatedBy", model.CreatedBy);
        }

        private static void AddForumCommonParams(ForumAddRequest model, SqlParameterCollection paramCol)
        {

            paramCol.AddWithValue("@Name", model.Name);
            paramCol.AddWithValue("@Description", model.Description);
            paramCol.AddWithValue("@ForumCategoryId", model.ForumCategoryId);
            paramCol.AddWithValue("@IsPrivate", model.IsPrivate);
            paramCol.AddWithValue("@IsClosed", model.IsClosed);

        }
    }
}