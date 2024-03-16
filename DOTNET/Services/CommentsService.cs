using Data.Providers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Requests.Comments;
using System.Reflection.PortableExecutable;
using Models;
using Models.Domain;
using Microsoft.Extensions.Configuration.UserSecrets;
using Models.Domain.Comment;
using Services.Interfaces;
using Data;
using System.Collections;


namespace Services
{
    public class CommentsService : ICommentService

    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;
        ILookUpService _lookUpService = null;
        public CommentsService(IDataProvider data, IBaseUserMapper userMapper, ILookUpService lookUp)
        {
            _data = data;
            _userMapper = userMapper;
            _lookUpService = lookUp;
        }

        public List<Comment> Get(int entityId, int entityTypeId)
        {
            string procName = "[dbo].[Comments_Select_ByEntityId]";

            List<Comment> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramColl)
            {
                paramColl.AddWithValue("@EntityId", entityId);
                paramColl.AddWithValue("@EntityTypeId", entityTypeId);



            }, delegate (IDataReader reader, short set)
            {
                Comment aComment = MapSingleComment(reader);

                if (list == null)
                {
                    list = new List<Comment>();
                }

                list.Add(aComment);
            }
            );

            return list;
        }

        public List<Comment> GetNestedComments(int entityId, int entityTypeId)
        {
            List<Comment> comments = Get(entityId, entityTypeId);
            List<Comment> list = new List<Comment>();
            Dictionary<int, Comment> dictComments = new Dictionary<int, Comment>();

            foreach (Comment comment in comments)
            {
                if (comment.ParentId == 0)
                {
                    dictComments.Add(comment.Id, comment);
                }
                if (comment.ParentId != 0)
                {
                    foreach (Comment nestedComment in comments)
                    {
                        if (comment.Id == nestedComment.ParentId)
                        {
                            comment.Replies ??= new List<Comment>();
                            comment.Replies.Add(nestedComment);
                        }
                    }
                    if (dictComments.ContainsKey(comment.ParentId))
                    {
                        dictComments[comment.ParentId].Replies ??= new List<Comment>();
                        dictComments[comment.ParentId].Replies.Add(comment);
                    }
                }
            }


            list = dictComments.Select(item => item.Value).ToList();
            list.Reverse();

            return list;
        }

        public int Add(CommentAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Comments_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {

                    paramCollection.AddWithValue("@CreatedBy", userId);

                    AddCommonParams(model, paramCollection);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    paramCollection.Add(idOut);

                }

                , returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                });
            return id;
        }

        public void Update(CommentUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Comments_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                AddCommonParams(model, paramCollection);
                paramCollection.AddWithValue("@Id", model.Id);
                paramCollection.AddWithValue("@ModifiedBy", userId);


            },
            returnParameters: null);
        }

        public void UpdateIsDeleted(int id, int userId)
        {

            string procName = "[dbo].[Comments_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
                paramCollection.AddWithValue("@ModifiedBy", userId);

            },
            returnParameters: null);
        }

        private Comment MapSingleComment(IDataReader reader)
        {
            Comment aComment = new Comment();

            int startingIndex = 0;

            aComment.Id = reader.GetSafeInt32(startingIndex++);
            aComment.Subject = reader.GetSafeString(startingIndex++);
            aComment.Text = reader.GetSafeString(startingIndex++);
            aComment.ParentId = reader.GetSafeInt32(startingIndex++);
            aComment.EntityType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aComment.EntityId = reader.GetSafeInt32(startingIndex++);
            aComment.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aComment.DateModified = reader.GetSafeDateTime(startingIndex++);
            aComment.Author = _userMapper.MapUser(reader, ref startingIndex);
            aComment.IsDeleted = reader.GetSafeBool(startingIndex++);
            return aComment;
        }
        private static void AddCommonParams(CommentAddRequest model, SqlParameterCollection paramCollection)
        {
            paramCollection.AddWithValue("@Subject", model.Subject);
            paramCollection.AddWithValue("@Text", model.Text);
            paramCollection.AddWithValue("@ParentId", model.ParentId);
            paramCollection.AddWithValue("@EntityTypeId", model.EntityTypeId);
            paramCollection.AddWithValue("@EntityId", model.EntityId);

        }

    }

};
