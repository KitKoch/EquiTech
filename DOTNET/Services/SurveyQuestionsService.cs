using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.SurveyQuestions;
using Models.Domain.SurveysInstances;
using Models.Requests.SurveyQuestions;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class SurveyQuestionsService : ISurveyQuestionsService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public SurveyQuestionsService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public int Add(SurveyQuestionsAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[SurveyQuestions_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                 {
                     AddCommonParams(model, col, userId);
                     col.AddWithValue("@UserId", userId);
                     SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                     idOut.Direction = System.Data.ParameterDirection.Output;
                     col.Add(idOut);
                 }, returnParameters: delegate (SqlParameterCollection returnCollection)
                 {
                     object oId = returnCollection["@Id"].Value;
                     int.TryParse(oId.ToString(), out id);
                 });
            return id;
        }

        public void Update(SurveyQuestionsUpdateRequest model, int userId)
        {
            string procName = "[dbo].[SurveyQuestions_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                }, returnParameters: null);
        }

        public BaseSurveyQuestion Get(int id)
        {
            string procName = "[SurveyQuestions_SelectById]";

            BaseSurveyQuestion surveyQuestion = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    surveyQuestion = MapBaseSurveyQuestion(reader, ref startingIndex);
                });
            return surveyQuestion;
        }

        public Paged<BaseSurveyQuestion> GetByCreatedBy(int pageSize, int pageIndex, int userId)
        {

            string procName = "[SurveyQuestions_SelectByCreatedBy]";
            int totalCount = 0;
            List<BaseSurveyQuestion> list = new List<BaseSurveyQuestion>();
            Paged<BaseSurveyQuestion> pagedQuestions = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@UserId", userId);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    BaseSurveyQuestion question = MapBaseSurveyQuestion(reader, ref startingIndex);


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    list.Add(question);
                });
            if (list != null)
            {
                pagedQuestions = new Paged<BaseSurveyQuestion>(list, pageIndex, pageSize, totalCount);
            }
            return pagedQuestions;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[SurveyQuestions_DeleteById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });

        }

        public Paged<BaseSurveyQuestion> Pagination(int pageIndex, int pageSize)
        {
            Paged<BaseSurveyQuestion> pagedList = null;
            List<BaseSurveyQuestion> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[SurveyQuestions_SelectAllPaginated]",
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    BaseSurveyQuestion question = MapBaseSurveyQuestion(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<BaseSurveyQuestion>();
                    }
                    list.Add(question);
                });
            if (list != null)
            {
                pagedList = new Paged<BaseSurveyQuestion>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        private BaseSurveyQuestion MapBaseSurveyQuestion(IDataReader reader, ref int startingIndex)
        {
            BaseSurveyQuestion surveyQuestion = new BaseSurveyQuestion();

            surveyQuestion.Id = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.UserId = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.Question = reader.GetSafeString(startingIndex++);
            surveyQuestion.HelpText = reader.GetSafeString(startingIndex++);
            surveyQuestion.IsRequired = reader.GetSafeBool(startingIndex++);
            surveyQuestion.isMultipleAllowed = reader.GetSafeBool(startingIndex++);
            surveyQuestion.QuestionType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            surveyQuestion.SurveyId = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.StatusType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            surveyQuestion.SortOrder = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.DateCreated = reader.GetSafeDateTime(startingIndex++);
            surveyQuestion.DateModified = reader.GetSafeDateTime(startingIndex++);

            return surveyQuestion;
        }
        private static void AddCommonParams(SurveyQuestionsAddRequest model, SqlParameterCollection col, int userId)
        {

            col.AddWithValue("@Question", model.Question);
            col.AddWithValue("@HelpText", model.HelpText);
            col.AddWithValue("@IsRequired", model.IsRequired);
            col.AddWithValue("@isMultipleAllowed", model.isMultipleAllowed);
            col.AddWithValue("@QuestionTypeId", model.QuestionTypeId);
            col.AddWithValue("@SurveyId", model.SurveyId);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@SortOrder", model.SortOrder);
        }

        public List<SurveyQuestion> GetSurveyQuestionsBySurveyId(int surveyId)
        {
            string procName = "[dbo].[SurveyQuestions_Select_BySurveyId]";
            List<SurveyQuestion> surveyQuestionList = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", surveyId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    SurveyQuestion question = MapSurveyQuestion(reader, ref startingIndex);

                    if (surveyQuestionList == null)
                    {
                        surveyQuestionList = new List<SurveyQuestion>();
                    }
                    surveyQuestionList.Add(question);

                });
            return surveyQuestionList;
        }

        private SurveyQuestion MapSurveyQuestion(IDataReader reader, ref int startingIndex)
        {
            SurveyQuestion surveyQuestion = new SurveyQuestion();

            surveyQuestion.Id = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.UserId = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.Question = reader.GetSafeString(startingIndex++);
            surveyQuestion.HelpText = reader.GetSafeString(startingIndex++);
            surveyQuestion.IsRequired = reader.GetSafeBool(startingIndex++);
            surveyQuestion.isMultipleAllowed = reader.GetSafeBool(startingIndex++);
            surveyQuestion.QuestionType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            surveyQuestion.AnswerOptions = reader.DeserializeObject<List<SurveyQuestionAnswerOption>>(startingIndex++);
            surveyQuestion.SurveyId = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.SurveyName = reader.GetSafeString(startingIndex++);
            surveyQuestion.StatusType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            surveyQuestion.SortOrder = reader.GetSafeInt32(startingIndex++);
            surveyQuestion.DateCreated = reader.GetSafeDateTime(startingIndex++);
            surveyQuestion.DateModified = reader.GetSafeDateTime(startingIndex++);

            return surveyQuestion;
        }
    }
}