﻿using Data.Providers;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Models;
using Data;
using Models.Requests.CandidateLocationsRequest;
using Models.Domain.CandidateLocations;
using Models.Domain;
using Models.Domain.Locations;
using Models.Requests.Appointments;
using Models.Domain.Blogs;
using System.Reflection;
using Services.Interfaces;

namespace Services
{
    public class CandidateLocationService : ICandidateLocationServices
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;
        ILocationService _locationService = null;

        public CandidateLocationService(IDataProvider data, IBaseUserMapper mapper, ILocationService locationService)
        {
            _data = data;
            _userMapper = mapper;
            _locationService = locationService;
        }

        public int AddCandidateLocation(CandidateLocationsAddRequest model, int userId)
        {

            string procName = "[dbo].[CandidateLocations_InsertV2]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@UserId", userId);
                    AddCandidateLocationCommonParams(model, collection);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object old = returnCollection["@UserId"].Value;
                    int.TryParse(old.ToString(), out userId);
                });
            return userId;
        }


        public int AddCandidateLocationForm(CandidateLocationsFormAddRequest model, int userId)
        {

            string procName = "[dbo].[CandidateLocations_InsertV3]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@UserId", userId);
                    collection.AddWithValue("@CreatedBy", userId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                    AddCandidateLocationFormCommonParams(model, collection);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object old = returnCollection["@UserId"].Value;
                    int.TryParse(old.ToString(), out userId);
                });
            return userId;
        }

        public List<CandidateLocation> GetCandidateLocationsByUserId(int userId)

        {
            List<CandidateLocation> list = null;
            string procName = "[dbo].[CandidateLocations_SelectByUserIdV2]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@UserId", userId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    CandidateLocation aCandidateLocation = new CandidateLocation();
                    aCandidateLocation = SingleRecordMapper(reader, ref startingIndex);
                    if (list == null)
                    {
                        list = new List<CandidateLocation>();
                    }
                    list.Add(aCandidateLocation);

                });
            return list;
        }

        public Paged<CandidateLocation> GetCandidateLocationByLocationIdRange(int start, int end, int pageIndex, int pageSize)
        {
            Paged<CandidateLocation> PagedList = null;
            List<CandidateLocation> list = null;
            int count = 0;
            string procName = "[dbo].[CandidateLocations_Select_ByLocationId_RangeV3]";
            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@StartLocationId", start);
                    paramCol.AddWithValue("@EndLocationId", end);
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                    paramCol.AddWithValue("@PageSize", pageSize);

                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    CandidateLocation aCandidateLocation = new CandidateLocation();
                    aCandidateLocation = SingleRecordMapper(reader, ref startingIndex);

                    if (count == 0)
                    {
                        count = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<CandidateLocation>();
                    }
                    list.Add(aCandidateLocation);
                }
                );
            if (list != null)
            {
                PagedList = new Paged<CandidateLocation>(list, pageIndex, pageSize, count);
            }
            return PagedList;

        }

        public Paged<CandidateLocation> GetCandidateLocationByGeoLocationIdRange(double lat, double lng, int distance, int pageIndex, int pageSize)
        {
            Paged<CandidateLocation> PagedList = null;
            List<CandidateLocation> list = null;
            int count = 0;
            string procName = "[dbo].[CandidateLocations_Select_ByGeoLocationId_Range]";
            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@lat", lat);
                    paramCol.AddWithValue("@lng", lng);
                    paramCol.AddWithValue("@distance", distance);
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                    paramCol.AddWithValue("@PageSize", pageSize);

                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    CandidateLocation aCandidateLocation = new CandidateLocation();
                    aCandidateLocation = SingleRecordMapper(reader, ref startingIndex);

                    if (count == 0)
                    {
                        count = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<CandidateLocation>();
                    }
                    list.Add(aCandidateLocation);
                }
                );
            if (list != null)
            {
                PagedList = new Paged<CandidateLocation>(list, pageIndex, pageSize, count);
            }
            return PagedList;

        }
        public void UpdateCandidateLocation(CandidateLocationsUpdateRequest model, int userId)
        {
            string procName = "[dbo].[CandidateLocations_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@UserId", userId);
                    AddCandidateLocationCommonParams(model, collection); ;
                    collection.AddWithValue("@OldLocationId", model.Id);
                },
                returnParameters: null);
        }

        public void UpdateCandidateLocationForm(CandidateLocationsFormUpdateRequest model, int userId)
        {
            string procName = "[dbo].[CandidateLocations_UpdateV2]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@ModifiedBy", userId);
                    AddCandidateLocationFormCommonParams(model, collection); ;
                    collection.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }


        public void DeleteCandidateLocation(int userId)
        {
            string procName = "[dbo].[CandidateLocations_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
            }, returnParameters: null
                );
        }

        public List<CandidateLocation> GetCandidateLocationByPreferenceId(int preferenceId)

        {
            List<CandidateLocation> list = null;
            string procName = "[dbo].[CandidateLocations_Select_ByPreferenceIdV2]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@PreferenceId", preferenceId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    CandidateLocation aCandidateLocation = new CandidateLocation();
                    aCandidateLocation = SingleRecordMapper(reader, ref startingIndex);
                    if (list == null)
                    {
                        list = new List<CandidateLocation>();
                    }
                    list.Add(aCandidateLocation);

                });
            return list;
        }


        private static void AddCandidateLocationFormCommonParams(CandidateLocationsFormAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@LocationTypeId", model.LocationTypeId);
            collection.AddWithValue("@LineOne", model.LineOne);
            collection.AddWithValue("@LineTwo", model.LineTwo);
            collection.AddWithValue("@City", model.City);
            collection.AddWithValue("@Zip", model.Zip);
            collection.AddWithValue("@StateId", model.StateId);
            collection.AddWithValue("@Latitude", model.Latitude);
            collection.AddWithValue("@Longitude", model.Longitude);
            collection.AddWithValue("@PreferenceId", model.PreferenceId);
            collection.AddWithValue("@SortOrder", model.SortOrder);
            collection.AddWithValue("@IsNegotiable", model.IsNegotiable);
        }

        private static void AddCandidateLocationCommonParams(CandidateLocationsAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@LocationId", model.LocationId);
            collection.AddWithValue("@PreferenceId", model.PreferenceId);
            collection.AddWithValue("@SortOrder", model.SortOrder);
            collection.AddWithValue("@IsNegotiable", model.IsNegotiable);
        }

        private CandidateLocation SingleRecordMapper(IDataReader reader, ref int startingIndex)
        {
            CandidateLocation candidateLocation = new CandidateLocation();

            candidateLocation.User = _userMapper.MapUser(reader, ref startingIndex);
            candidateLocation.Location = _locationService.MapSingleLocation(reader, ref startingIndex);
            candidateLocation.PreferenceId = reader.GetSafeInt32(startingIndex++);
            candidateLocation.SortOrder = reader.GetSafeInt32(startingIndex++);
            candidateLocation.IsNegotiable = reader.GetSafeBool(startingIndex++);
            return candidateLocation;
        }

    }
}