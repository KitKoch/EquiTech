using Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Ratings;
using Data;
using Models.Domain;
using Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Stripe;
using Models.Requests.Locations;
using Models.Requests.Ratings;

namespace Sabio.Services
{
    public class RatingService : IRatingService
    {
        IDataProvider _data = null;
        IBaseUserMapper _baseUserMapper = null;

        public RatingService(IDataProvider data, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _baseUserMapper = baseUserMapper;
        }

        public Rating Get(int id)
        {
            string procName = "[dbo].[Ratings_Select_ById]";
            Rating rating = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    rating = MapSingleRating(reader, ref index);
                }
                );

            return rating;
        }

        public Paged<Rating> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Rating> pagedlist = null;
            List<Rating> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Ratings_Select_ByCreatedBy]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                    paramColl.AddWithValue("@CreatedBy", createdBy);
                }
                ,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Rating aRating = MapSingleRating(reader, ref startingIndex);

                    if (totalCount == 0)
                    {

                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (list == null)
                    {
                        list = new List<Rating>();
                    }

                    list.Add(aRating);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Rating>(list, pageIndex, pageSize, totalCount);
            }

            return pagedlist;
        }

        public Paged<Rating> GetAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Rating> pagedlist = null;
            List<Rating> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Ratings_SelectAll]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                }
                ,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Rating aRating = MapSingleRating(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Rating>();
                    }

                    list.Add(aRating);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Rating>(list, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public int Add(RatingAddRequest rating, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Ratings_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(rating, coll);
                    coll.AddWithValue("@CreatedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
                );

            return id;
        }

        public void Update(RatingUpdateRequest rating, int userId)
        {
            string procName = "[dbo].[Ratings_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", rating.Id);
                    AddCommonParams(rating, coll);
                    coll.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null
                );
        }

        public void Delete(RatingUpdateRequest rating, int userId)
        {
            string procName = "[dbo].[Ratings_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", rating.Id);
                    coll.AddWithValue("@UserId", userId);
                },
                returnParameters: null
                );
        }

        public Paged<Rating> GetByEntityId(int pageIndex, int pageSize, int entityTypeId, int entityId)
        {
            Paged<Rating> pagedlist = null;
            List<Rating> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Ratings_Select_ByEntityId]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                    paramColl.AddWithValue("@EntityTypeId", entityTypeId);
                    paramColl.AddWithValue("@EntityId", entityId);
                }
                ,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Rating aRating = MapSingleRating(reader, ref startingIndex);

                    if (totalCount == 0)
                    {

                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (list == null)
                    {
                        list = new List<Rating>();
                    }

                    list.Add(aRating);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Rating>(list, pageIndex, pageSize, totalCount);
            }

            return pagedlist;
        }

        public int GetAverage(int entityTypeId, int entityId)
        {
            string procName = "[dbo].[Ratings_SelectSummary_ByEntityId]";
            int average = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@EntityTypeId", entityTypeId);
                    coll.AddWithValue("@EntityId", entityId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;

                    average = reader.GetSafeInt32(index++);
                }
                );
            return average;
        }



        private static void AddCommonParams(RatingAddRequest rating, SqlParameterCollection coll)
        {
            coll.AddWithValue("@Rating", rating.Rating);
            coll.AddWithValue("@CommentId", rating.CommentId);
            coll.AddWithValue("@EntityTypeId", rating.EntityTypeId);
            coll.AddWithValue("@EntityId", rating.EntityId);
        }

        private Rating MapSingleRating(IDataReader reader, ref int startingIndex)
        {
            Rating aRating = new Rating();

            aRating.Id = reader.GetSafeInt32(startingIndex++);
            aRating.RatingScore = reader.GetSafeByte(startingIndex++);
            aRating.CommentId = reader.GetSafeInt32(startingIndex++);

            aRating.EntityType = new LookUp();
            aRating.EntityType.Id = reader.GetSafeInt32(startingIndex++);
            aRating.EntityType.Name = reader.GetSafeString(startingIndex++);

            aRating.EntityId = reader.GetSafeInt32(startingIndex++);

            aRating.CreatedBy = new BaseUser();
            aRating.CreatedBy.Id = reader.GetSafeInt32(startingIndex++);
            aRating.CreatedBy.FirstName = reader.GetSafeString(startingIndex++);
            aRating.CreatedBy.LastName = reader.GetSafeString(startingIndex++);
            aRating.CreatedBy.Mi = reader.GetSafeString(startingIndex++);
            aRating.CreatedBy.AvatarUrl = reader.GetSafeString(startingIndex++);

            aRating.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aRating.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aRating.DateModified = reader.GetSafeDateTime(startingIndex++);
            aRating.IsDeleted = reader.GetSafeBool(startingIndex++);

            return aRating;
        }
    }
}
