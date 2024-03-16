using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Skills;
using Models.Domain.Surveys;
using Models.Domain.SurveysInstances;
using Models.Requests.SurveysInstances;
using Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class SurveyInstanceService : ISurveyInstanceService
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;
        ILookUpService _lookUpService = null;
        public SurveyInstanceService(IDataProvider data, IBaseUserMapper userMapper, ILookUpService lookUp)
        {
            _data = data;
            _userMapper = userMapper;
            _lookUpService = lookUp;
        }

        // Insert survey instance
        public int AddSurveyInstance(SurveyInstanceAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[SurveysInstances_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = System.Data.ParameterDirection.Output;

                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        // Update survey instance
        public void UpdateSurveyInstance(SurveyInstanceUpdateRequest model)
        {
            string procName = "[dbo].[SurveysInstances_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        // Insert/Update values
        private static void AddCommonParams(SurveyInstanceAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@SurveyId", model.SurveyId);
            collection.AddWithValue("@UserId", model.UserId);
        }

        // Get survey instance by Id
        public BaseSurveyInstance GetSurveyInstanceById(int id)
        {
            string procName = "[dbo].[SurveysInstances_SelectById]";

            BaseSurveyInstance surveyInstace = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    surveyInstace = MapSingleBaseSurveyInstance(reader, ref startingIndex);
                });
            return surveyInstace;
        }

        // Get all survey instances Paginated
        public Paged<BaseSurveyInstance> GetSurveyInstancesPaged(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[SurveysInstances_SelectAll]";
            Paged<BaseSurveyInstance> pagedList = null;
            List<BaseSurveyInstance> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    BaseSurveyInstance surveyInstance = MapSingleBaseSurveyInstance(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<BaseSurveyInstance>();
                    }
                    list.Add(surveyInstance);
                });

            if (list != null)
            {
                pagedList = new Paged<BaseSurveyInstance>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        // Get survey instance by survey id
        public Paged<BaseSurveyInstance> GetSurveyInstanceBySurveyId(int pageIndex, int pageSize, int surveyId)
        {
            string procName = "[dbo].[SurveysInstances_Select_BySurveyId]";
            Paged<BaseSurveyInstance> pagedList = null;
            List<BaseSurveyInstance> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                    collection.AddWithValue("@SurveyId", surveyId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    BaseSurveyInstance surveyInstance = MapSingleBaseSurveyInstance(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<BaseSurveyInstance>();
                    }

                    list.Add(surveyInstance);
                });
            if (list != null)
            {
                pagedList = new Paged<BaseSurveyInstance>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        // Get survey instance by survey id
        public Paged<BaseSurveyInstance> GetSurveyInstanceByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            string procName = "[dbo].[SurveysInstances_Select_ByCreatedBy]";
            Paged<BaseSurveyInstance> pagedList = null;
            List<BaseSurveyInstance> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                    collection.AddWithValue("@CreatedBy", userId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    BaseSurveyInstance surveyInstance = MapSingleBaseSurveyInstance(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<BaseSurveyInstance>();
                    }

                    list.Add(surveyInstance);
                });
            if (list != null)
            {
                pagedList = new Paged<BaseSurveyInstance>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        // Map one record for all Gets 
        private BaseSurveyInstance MapSingleBaseSurveyInstance(IDataReader reader, ref int startingIndex)
        {
            BaseSurveyInstance aSurveyInstance = new BaseSurveyInstance();

            aSurveyInstance.Id = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.SurveyId = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.Creator = _userMapper.MapUser(reader, ref startingIndex);
            aSurveyInstance.Email = reader.GetSafeString(startingIndex++);
            aSurveyInstance.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aSurveyInstance.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aSurveyInstance;
        }

        // Get instance by id details
        public SurveyInstance GetSurveyInstanceByIdDetails(int id)
        {
            string procName = "[dbo].[SurveysInstances_Select_ById_DetailsV2]";

            SurveyInstance surveyInstace = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    surveyInstace = MapSingleSurveyInstance(reader, ref startingIndex);
                });

            return surveyInstace;
        }

        // Map one record for get by id details
        private SurveyInstance MapSingleSurveyInstance(IDataReader reader, ref int startingIndex)
        {
            SurveyInstance aSurveyInstance = new SurveyInstance();

            aSurveyInstance.Id = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.SurveyId = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.SurveyName = reader.GetSafeString(startingIndex++);
            aSurveyInstance.SurveyStatus = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aSurveyInstance.Creator = _userMapper.MapUser(reader, ref startingIndex);
            aSurveyInstance.Email = reader.GetSafeString(startingIndex++);
            aSurveyInstance.Questions = reader.DeserializeObject<List<InstanceSurveyQuestion>>(startingIndex++);
            aSurveyInstance.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aSurveyInstance.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aSurveyInstance;
        }

        // Delete survey instance by id
        public void DeleteSurveyInstanceById(int id)
        {
            string procName = "[dbo].[SurveysInstances_DeleteById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

    }
}