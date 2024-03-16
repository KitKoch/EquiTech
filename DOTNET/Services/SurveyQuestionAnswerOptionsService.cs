using Data;
using Data.Providers;
using Models.Domain.SurveyQuestions;
using Models.Requests.SurveyQuestions;
using Services.Interfaces;
using Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Services
{
    public class SurveyQuestionAnswerOptionsService : ISurveyQuestionAnswerOptions
    {
        private static IDataProvider _data = null;

        public SurveyQuestionAnswerOptionsService(IDataProvider data, IBaseUserMapper mapper)
        {
            _data = data;

        }

        public int Add(SurveyQuestionAnswerOptionsAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[SurveyQuestionAnswerOptions_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void Update(SurveyQuestionAnswerOptionsUpdateRequest model, int userId)
        {
            string procName = "[dbo].[SurveyQuestionAnswerOptions_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            }, returnParameters: null);
        }

        public SurveyQuestionAnswerOption Get(int id)
        {
            string procName = "[SurveyQuestionAnswerOptions_SelectById]";

            SurveyQuestionAnswerOption answerOption = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                answerOption = MapSurveyQuestionAnswerOption(reader, ref startingIndex);
            });
            return answerOption;
        }

        public List<SurveyQuestionAnswerOption> GetByCreatedBy(int createdBy)
        {
            List<SurveyQuestionAnswerOption> list = null;

            string procName = "[SurveyQuestionAnswerOptions_SelectByCreatedBy]";

            _data.ExecuteCmd(procName,

                 inputParamMapper: delegate (SqlParameterCollection col)
                 {
                     col.AddWithValue("@UserId", createdBy);

                 }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                SurveyQuestionAnswerOption answerOption = MapSurveyQuestionAnswerOption(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<SurveyQuestionAnswerOption>();
                }
                list.Add(answerOption);
            });
            return list;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[SurveyQuestionAnswerOptions_DeleteById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });

        }

        public Paged<SurveyQuestionAnswerOption> Pagination(int pageIndex, int pageSize)
        {
            Paged<SurveyQuestionAnswerOption> pagedList = null;
            List<SurveyQuestionAnswerOption> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[SurveyQuestionAnswerOptions_SelectAllPaginated]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    SurveyQuestionAnswerOption answerOption = MapSurveyQuestionAnswerOption(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<SurveyQuestionAnswerOption>();
                    }
                    list.Add(answerOption);
                });
            if (list != null)
            {
                pagedList = new Paged<SurveyQuestionAnswerOption>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        public List<SurveyQuestionAnswerOption> GetSurveyQuestions()
        {
            List<SurveyQuestionAnswerOption> surveyQuestions = null;

            _data.ExecuteCmd("[dbo].[SurveyQuestionAnswerOptions]",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SurveyQuestionAnswerOption aQuestion = new SurveyQuestionAnswerOption();
                    int startingIndex = 0;


                    aQuestion.QuestionId = reader.GetSafeInt32(startingIndex++);
                    aQuestion.Text = reader.GetString(startingIndex++);
                    aQuestion.Id = reader.GetSafeInt32(startingIndex++);

                    if (surveyQuestions == null)
                    {
                        surveyQuestions = new List<SurveyQuestionAnswerOption>();
                    }
                    surveyQuestions.Add(aQuestion);

                });
            return surveyQuestions;
        }

        private static SurveyQuestionAnswerOption MapSurveyQuestionAnswerOption(IDataReader reader, ref int startingIndex)
        {
            SurveyQuestionAnswerOption answerOption = new SurveyQuestionAnswerOption();

            answerOption.Id = reader.GetSafeInt32(startingIndex++);
            answerOption.QuestionId = reader.GetSafeInt32(startingIndex++);
            answerOption.Text = reader.GetSafeString(startingIndex++);
            answerOption.Value = reader.GetSafeString(startingIndex++);
            answerOption.AdditionalInfo = reader.GetSafeString(startingIndex++);
            answerOption.PersonalValueId = reader.GetSafeInt32(startingIndex++);
            answerOption.CreatedBy = reader.GetSafeInt32(startingIndex++);

            return answerOption;

        }

        private static void AddCommonParams(SurveyQuestionAnswerOptionsAddRequest model, SqlParameterCollection col, int userId)
        {

            col.AddWithValue("@QuestionId", model.QuestionId);
            col.AddWithValue("@Text", model.Text);
            col.AddWithValue("@Value", model.Value);
            col.AddWithValue("@AdditionalInfo", model.AdditionalInfo);
            col.AddWithValue("@PersonalValueId", model.PersonalValueId);
            col.AddWithValue("@CreatedBy", userId);
        }

    }
}
