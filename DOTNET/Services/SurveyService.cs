using Newtonsoft.Json;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Surveys;
using Models.Requests.Surveys;
using Services.Interfaces.Survey;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Surveys
{
    public class SurveyService : ISurveyService
    {
        private static IDataProvider _data = null;
        private static IBaseUserMapper _userMapper = null;

        public SurveyService(IDataProvider data, IBaseUserMapper mapper)
        {
            _data = data;
            _userMapper = mapper;
        }

        public int AddSurvey(SurveyAddRequest model, int userId)
        {
            int Id = 0;

            string procName = "[dbo].[Surveys_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                AddCommonParams(model, param);
                param.AddWithValue("@UserId", userId);

                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Direction = ParameterDirection.Output;

                param.Add(id);
            }, returnParameters: delegate (SqlParameterCollection col)
            {
                int.TryParse(col["@Id"].Value.ToString(), out Id);
            });
            return Id;
        }

        public Paged<Survey> GetAllByPagination(int pageIndex, int pageSize)
        {
            Paged<Survey> pagedResult = null;

            List<Survey> result = null;

            int totalCount = 0;

            string procName = "[dbo].[Surveys_SelectAll_Paginated]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@pageIndex", pageIndex);
                param.AddWithValue("@pageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Survey survey = SingleSurveyMapper(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Survey>();
                }
                result.Add(survey);

            });
            if (result != null)
            {
                pagedResult = new Paged<Survey>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Survey GetById(int id)
        {
            string procName = "[dbo].[Surveys_SelectById]";

            Survey survey = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Id", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                survey = SingleSurveyMapper(reader, ref index);
            });
            return survey;
        }

        public Paged<Survey> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            string procName = "[dbo].[Surveys_Select_CreatedBy]";

            Paged<Survey> pagedResult = null;

            List<Survey> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@UserId", userId);
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Survey survey = SingleSurveyMapper(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Survey>();
                }
                result.Add(survey);
            });
            if (result != null)
            {
                pagedResult = new Paged<Survey>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public void UpdateSurvey(SurveyUpdateRequest request)
        {
            string procName = "[dbo].[Surveys_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                AddCommonParams(request, param);
                param.AddWithValue("@Id", request.Id);
                param.AddWithValue("@StatusId", request.StatusId);

            }, returnParameters: null);
        }

        public void DeleteSurvey(int id)
        {
            string procName = "[dbo].[Surveys_DeleteById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Id", id);
            }, returnParameters: null);
        }

        private void AddCommonParams(SurveyAddRequest model, SqlParameterCollection param)
        {
            param.AddWithValue("@Name", model.Name);
            param.AddWithValue("@Description", model.Description);
        }

        private static Survey SingleSurveyMapper(IDataReader reader, ref int startingIndex)
        {
            Survey survey = new Survey();
            survey.SurveyStatus = new LookUp();
            survey.SurveyTypes = new LookUp();
            survey.Id = reader.GetSafeInt32(startingIndex++);
            survey.Name = reader.GetSafeString(startingIndex++);
            survey.Description = reader.GetSafeString(startingIndex++);
            survey.SurveyStatus.Id = reader.GetSafeInt32(startingIndex++);
            survey.SurveyStatus.Name = reader.GetSafeString(startingIndex++);
            survey.SurveyTypes.Id = reader.GetSafeInt32(startingIndex++);
            survey.SurveyTypes.Name = reader.GetSafeString(startingIndex++);
            survey.CreatedBy = _userMapper.MapUser(reader, ref startingIndex);
            survey.DateCreated = reader.GetSafeDateTime(startingIndex++);
            survey.DateModified = reader.GetSafeDateTime(startingIndex++);

            return survey;
        }
    }
}
