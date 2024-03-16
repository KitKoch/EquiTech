using Microsoft.AspNetCore.Mvc.Formatters;
using Data;
using Data.Providers;
using Models;
using Models.Requests.Locations;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain;
using Models.Domain.Locations;

namespace Services
{
    public class LocationService : ILocationService
    {
        IDataProvider _data = null;
        IBaseUserMapper _baseUserMapper = null;

        public LocationService(IDataProvider data, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _baseUserMapper = baseUserMapper;
        }

        public Location Get(int id)
        {
            string procName = "[dbo].[Locations_Select_ById]";
            Location location = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    location = MapSingleLocation(reader, ref index);
                }
                );

            return location;
        }

        public Paged<Location> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Location> pagedlist = null;
            List<Location> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Locations_Select_ByCreatedBy]";

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

                    Location aLocation = MapSingleLocation(reader, ref startingIndex);

                    if (totalCount == 0)
                    {

                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (list == null)
                    {
                        list = new List<Location>();
                    }

                    list.Add(aLocation);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Location>(list, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public Paged<Location> GetPaginated(int pageIndex, int pageSize)
        {
            Paged<Location> pagedlist = null;
            List<Location> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Locations_SelectAll]";

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

                    Location aLocation = MapSingleLocation(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Location>();
                    }

                    list.Add(aLocation);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Location>(list, pageIndex, pageSize, totalCount);
            }
            return pagedlist;
        }

        public List<Location> GetAll()
        {
            string procName = "[dbo].[Locations_SelectAllEveryLoc]";
            List<Location> locationsList = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Location aLocation = MapSingleLocation(reader, ref index);

                if (locationsList == null)
                {
                    locationsList = new List<Location>();
                }
                locationsList.Add(aLocation);
            });
            return locationsList;
        }

        public int Add(LocationAddRequest location, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Locations_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(location, coll);
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

        public void Update(LocationUpdateRequest location, int userId)
        {
            string procName = "[dbo].[Locations_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", location.Id);
                    AddCommonParams(location, coll);
                    coll.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null
                );
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Locations_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }

        private static void AddCommonParams(LocationAddRequest location, SqlParameterCollection coll)
        {
            coll.AddWithValue("@LocationTypeId", location.LocationTypeId);
            coll.AddWithValue("@LineOne", location.LineOne);
            coll.AddWithValue("@LineTwo", location.LineTwo);
            coll.AddWithValue("@City", location.City);
            coll.AddWithValue("@Zip", location.Zip);
            coll.AddWithValue("@StateId", location.StateId);
            coll.AddWithValue("@Latitude", location.Latitude);
            coll.AddWithValue("@Longitude", location.Longitude);
        }

        public Location MapSingleLocation(IDataReader reader, ref int startingIndex)
        {
            Location aLocation = new Location();

            aLocation.Id = reader.GetSafeInt32(startingIndex++);

            aLocation.LocationType = new LookUp();
            aLocation.LocationType.Id = reader.GetSafeInt32(startingIndex++);
            aLocation.LocationType.Name = reader.GetSafeString(startingIndex++);

            aLocation.LineOne = reader.GetSafeString(startingIndex++);
            aLocation.LineTwo = reader.GetSafeString(startingIndex++);
            aLocation.City = reader.GetSafeString(startingIndex++);
            aLocation.Zip = reader.GetSafeString(startingIndex++);

            aLocation.State = new LookUp3Col();
            aLocation.State.Id = reader.GetSafeInt32(startingIndex++);
            aLocation.State.Name = reader.GetSafeString(startingIndex++);
            aLocation.State.Col3 = reader.GetSafeString(startingIndex++);

            aLocation.Latitude = reader.GetSafeDouble(startingIndex++);
            aLocation.Longitude = reader.GetSafeDouble(startingIndex++);
            aLocation.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aLocation.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aLocation;
        }
    }
}
