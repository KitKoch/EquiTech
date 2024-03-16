using Microsoft.Extensions.Options;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.SurveyAnswers;
using Models.Requests.Skills;
using Models.Requests.SurveyAnswers;
using Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class SurveyAnswerService : ISurveyAnswerService
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;
        ILookUpService _lookUpService = null;

        public SurveyAnswerService(
            IDataProvider data,
            IBaseUserMapper userMapper,
            ILookUpService lookUpService)
        {
            _data = data;
            _userMapper = userMapper;
            _lookUpService = lookUpService;
        }

        public int AddSurveyAnswer(SurveyAnswerAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[SurveyAnswers_Insert]";

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

        public void UpdateSurveyAnswer(SurveyAnswerUpdateRequest model)
        {
            string procName = "[dbo].[SurveyAnswers_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        private static void AddCommonParams(SurveyAnswerAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@InstanceId", model.InstanceId);
            collection.AddWithValue("@QuestionId", model.QuestionId);
            collection.AddWithValue("@AnswerOptionId", (object)model.AnswerOptionId ?? DBNull.Value);
            collection.AddWithValue("@Answer", (object)model.Answer ?? DBNull.Value);
            collection.AddWithValue("@AnswerNumber", (object)model.AnswerNumber ?? DBNull.Value);
        }

        public SurveyAnswer GetSurveyAnswerById(int id)
        {
            string procName = "[dbo].[SurveyAnswers_SelectById]";

            SurveyAnswer surveyAnswer = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    surveyAnswer = MapSingleSurveyAnswer(reader, ref startingIndex);
                });
            return surveyAnswer;
        }

        public Paged<SurveyAnswer> GetSurveyAnswerPaged(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[SurveyAnswers_SelectAll]";
            Paged<SurveyAnswer> pagedList = null;
            List<SurveyAnswer> list = null;
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
                    SurveyAnswer surveyAnswer = MapSingleSurveyAnswer(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<SurveyAnswer>();
                    }
                    list.Add(surveyAnswer);
                });

            if (list != null)
            {
                pagedList = new Paged<SurveyAnswer>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<SurveyAnswer> GetSurveyAnswerByInstanceId(int instanceId)
        {
            string procName = "[dbo].[SurveyAnswers_Select_BySurveyInstanceId]";

            List<SurveyAnswer> surveyAnswerList = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@SurveyInstanceId", instanceId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    SurveyAnswer surveyAnswer = MapSingleSurveyAnswer(reader, ref startingIndex);

                    if (surveyAnswerList == null)
                    {
                        surveyAnswerList = new List<SurveyAnswer>();
                    }
                    surveyAnswerList.Add(surveyAnswer);
                });

            return surveyAnswerList;
        }

        public Paged<SurveyAnswer> GetSurveyAnswerByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            string procName = "[dbo].[SurveyAnswer_Select_ByCreatedBy]";
            Paged<SurveyAnswer> pagedList = null;
            List<SurveyAnswer> list = null;
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
                    SurveyAnswer surveyAnswer = MapSingleSurveyAnswer(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<SurveyAnswer>();
                    }
                    list.Add(surveyAnswer);
                });
            if (list != null)
            {
                pagedList = new Paged<SurveyAnswer>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<SurveyInstanceAnsweredBy> GetSurveyInstancesAnswerPaged(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[SurveysInstances_InstanceAnsweredByPaged]";
            Paged<SurveyInstanceAnsweredBy> pagedList = null;
            List<SurveyInstanceAnsweredBy> list = null;
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
                    SurveyInstanceAnsweredBy instanceAnsweredBy = MapSingleInstanceAnsweredBy(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<SurveyInstanceAnsweredBy>();
                    }
                    list.Add(instanceAnsweredBy);
                });

            if (list != null)
            {
                pagedList = new Paged<SurveyInstanceAnsweredBy>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static SurveyAnswer MapSingleSurveyAnswer(IDataReader reader, ref int startingIndex)
        {
            SurveyAnswer aSurveyAnswer = new SurveyAnswer();

            aSurveyAnswer.Id = reader.GetSafeInt32(startingIndex++);
            aSurveyAnswer.InstanceId = reader.GetSafeInt32(startingIndex++);
            aSurveyAnswer.QuestionId = reader.GetSafeInt32(startingIndex++);
            aSurveyAnswer.AnswerOptionId = reader.GetSafeInt32(startingIndex++);
            aSurveyAnswer.Answer = reader.GetSafeString(startingIndex++);
            aSurveyAnswer.AnswerNumber = reader.GetSafeBool(startingIndex++);
            aSurveyAnswer.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aSurveyAnswer.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aSurveyAnswer;
        }

        private SurveyInstanceAnsweredBy MapSingleInstanceAnsweredBy(IDataReader reader, ref int startingIndex)
        {
            SurveyInstanceAnsweredBy aSurveyInstance = new SurveyInstanceAnsweredBy();

            aSurveyInstance.SurveyAnswerId = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.SurveyId = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.SurveyName = reader.GetSafeString(startingIndex++);
            aSurveyInstance.SurveyStatus = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aSurveyInstance.SurveyType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aSurveyInstance.InstanceId = reader.GetSafeInt32(startingIndex++);
            aSurveyInstance.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aSurveyInstance.DateModified = reader.GetSafeDateTime(startingIndex++);
            aSurveyInstance.SurveyTaker = _userMapper.MapUser(reader, ref startingIndex);

            return aSurveyInstance;
        }

        public void DeleteSurveyAnswerById(int id)
        {
            string procName = "[dbo].[SurveyAnswers_DeleteById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

    }
}
