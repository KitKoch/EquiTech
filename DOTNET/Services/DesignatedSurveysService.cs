using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Data;
using Data.Providers;
using Models;
using Models.Domain.DesignatedSurveys;
using Models.Domain.SurveyAnswers;
using Models.Requests.DesignatedSurveys;
using Services.Interfaces;

namespace Services
{
    public class DesignatedSurveysService : IDesignatedSurveysService
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;

        public DesignatedSurveysService(
            IDataProvider data,
            IBaseUserMapper userMapper)
        {
            _data = data;
            _userMapper = userMapper;
        }

        public int AddDesignatedSurvey(DesignatedSurveyAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[DesignatedSurveys_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@IsDeleted", model.isDeleted);
                    col.AddWithValue("@CreatedBy", userId);
                    col.AddWithValue("@ModifiedBy", userId);


                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public void UpdateDesignatedSurvey(DesignatedSurveyUpdateRequest model, int userId)
        {
            string procName = "[dbo].[DesignatedSurveys_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@ModifiedBy", userId);

                },
                returnParameters: null);
        }
        public void UpdateIsDeleted(DesignatedSurveyUpdateRequest model, int userId)
        {
            string procName = "[dbo].[DesignatedSurveys_UpdateIsDeleted]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }
        public DesignatedSurvey GetDesignatedSurveyById(int id)
        {
            string procName = "[dbo].[DesignatedSurveys_SelectById]";

            DesignatedSurvey designatedSurvey = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    designatedSurvey = MapSingleDesignatedSurvey(reader, ref startingIndex);
                });
            return designatedSurvey;
        }
        public DesignatedSurvey GetDesignatedSurveyBySurveyId(int id)
        {
            string procName = "[dbo].[DesignatedSurveys_SelectBySurveyTypeId]";

            DesignatedSurvey designatedSurvey = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@SurveyId", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    designatedSurvey = MapSingleDesignatedSurvey(reader, ref startingIndex);
                });
            return designatedSurvey;
        }
        public DesignatedSurvey GetDesignatedSurveyByWorkflowTypeId(int id)
        {
            string procName = "[dbo].[DesignatedSurveys_SelectByWorkflowTypeId]";

            DesignatedSurvey designatedSurvey = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@WorkflowTypeId", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    designatedSurvey = MapSingleDesignatedSurvey(reader, ref startingIndex);
                });
            return designatedSurvey;
        }
        public Paged<DesignatedSurvey> GetDesignatedSurveysPaged(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[DesignatedSurveys_SelectPaged]";
            Paged<DesignatedSurvey> pagedList = null;
            List<DesignatedSurvey> list = null;
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
                    DesignatedSurvey designatedSurvey = MapSingleDesignatedSurvey(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<DesignatedSurvey>();
                    }
                    list.Add(designatedSurvey);
                });

            if (list != null)
            {
                pagedList = new Paged<DesignatedSurvey>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        private static void AddCommonParams(DesignatedSurveyAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Version", model.Version);
            col.AddWithValue("@WorkflowTypeId", model.WorkflowType);
            col.AddWithValue("@SurveyId", model.SurveyId);
            col.AddWithValue("@EntityTypeId", model.EntityType);
            col.AddWithValue("@EntityId", model.EntityId);
        }
        private DesignatedSurvey MapSingleDesignatedSurvey(IDataReader reader, ref int startingIndex)
        {
            DesignatedSurvey aDesignatedSurvey = new DesignatedSurvey();

            aDesignatedSurvey.DesignatedSurveyId = reader.GetSafeInt32(startingIndex++);
            aDesignatedSurvey.Name = reader.GetSafeString(startingIndex++);
            aDesignatedSurvey.Version = reader.GetSafeString(startingIndex++);
            aDesignatedSurvey.WorkflowTypeId = reader.GetSafeInt32(startingIndex++);
            aDesignatedSurvey.SurveyId = reader.GetSafeInt32(startingIndex++);
            aDesignatedSurvey.EntityType = reader.GetSafeInt32(startingIndex++);
            aDesignatedSurvey.EntityId = reader.GetSafeInt32(startingIndex++);
            aDesignatedSurvey.IsDeleted = reader.GetSafeBool(startingIndex++);
            aDesignatedSurvey.CreatedBy = _userMapper.MapUser(reader, ref startingIndex);
            aDesignatedSurvey.ModifiedBy = _userMapper.MapUser(reader, ref startingIndex);
            aDesignatedSurvey.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aDesignatedSurvey.DateModified = reader.GetSafeDateTime(startingIndex++);


            return aDesignatedSurvey;
        }
    }
}
