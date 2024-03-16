using Microsoft.Extensions.Configuration.UserSecrets;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Locations;
using Models.Domain.Venues;
using Models.Requests.Venues;
using Services.Interfaces;
using Stripe;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class VenuesService : IVenuesService
    {
        IDataProvider _data = null;
        private static IBaseUserMapper _userMapper = null;

        public VenuesService(IDataProvider data, IBaseUserMapper userMapper)
        {
            _data = data;
            _userMapper = userMapper;

        }

        public int Add(VenueAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Venues_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);

            },
            returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void Update(VenueUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Venues_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }

        public Venue GetById(int id)
        {
            string procName = "[dbo].Venues_SelectById";
            Venue aVenue = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                aVenue = MapSingleVenue(reader, ref startingIndex);
            });
            return aVenue;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].Venues_Delete_ById";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        public Paged<Venue> GetCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            string procName = "[dbo].Venues_Select_ByCreatedBy";
            int totalCount = 0;
            Paged<Venue> pagedResult = null;
            List<Venue> result = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection inputParams)
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
                inputParams.AddWithValue("@CreatedBy", createdBy);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Venue aVenue = MapSingleVenue(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (result == null)
                {
                    result = new List<Venue>();
                }
                result.Add(aVenue);
            }
            );
            if (result != null)
            {
                pagedResult = new Paged<Venue>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Venue> GetAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Venue> pagedList = null;
            List<Venue> result = null;
            int totalCount = 0;
            string procName = "[dbo].[Venues_SelectAll]";

            _data.ExecuteCmd(procName,
                inputParamMapper:
                delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Venue aVenue = MapSingleVenue(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<Venue>();
                    }
                    result.Add(aVenue);
                }
                );
            if (result != null)
            {
                pagedList = new Paged<Venue>(result, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Venue> SearchPagination(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Venues_Search]";
            Paged<Venue> pagedList = null;
            List<Venue> venuesList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Venue aVenue = MapSingleVenue(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (venuesList == null)
                {
                    venuesList = new List<Venue>();
                }
                venuesList.Add(aVenue);
            });
            if (venuesList != null)
            {
                pagedList = new Paged<Venue>(venuesList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        private static void AddCommonParams(VenueAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@LocationId", model.LocationId);
            col.AddWithValue("@Url", model.Url);
        }

        private static Venue MapSingleVenue(IDataReader reader, ref int startingIndex)
        {
            Venue aVenue = new Venue();

            aVenue.Id = reader.GetSafeInt32(startingIndex++);
            aVenue.Name = reader.GetSafeString(startingIndex++);
            aVenue.Description = reader.GetSafeString(startingIndex++);
            aVenue.Location = new Location();
            aVenue.Location.Id = reader.GetSafeInt32(startingIndex++);
            aVenue.Location.LineOne = reader.GetSafeString(startingIndex++);
            aVenue.Location.LineTwo = reader.GetSafeString(startingIndex++);
            aVenue.Location.City = reader.GetSafeString(startingIndex++);
            aVenue.Location.Zip = reader.GetSafeString(startingIndex++);
            aVenue.State = new LookUp3Col();
            aVenue.State.Id = reader.GetSafeInt32(startingIndex++);
            aVenue.State.Name = reader.GetSafeString(startingIndex++);
            aVenue.State.Col3 = reader.GetSafeString(startingIndex++);
            aVenue.Url = reader.GetSafeString(startingIndex++);
            aVenue.CreatedBy = _userMapper.MapUser(reader, ref startingIndex);
            aVenue.ModifiedBy = _userMapper.MapUser(reader, ref startingIndex);

            return aVenue;
        }

    }
}