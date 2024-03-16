using Data;
using Data.Providers;
using Models;
using Models.Domain.Locations;
using Models.Domain;
using Models.Domain.UsersEducationLevels;
using Models.Domain.WorkHistory;
using Models.Requests.NewsletterSubscriptions;
using Models.Requests.WorkHistory;
using Services.Interfaces;
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
    public class WorkHistoryService : IWorkHistoryService
    {
        IDataProvider _data;
        ILookUpService _lookUpMapper;

        public WorkHistoryService(IDataProvider data, ILookUpService lookUpMapper)
        {
            _data = data;
            _lookUpMapper = lookUpMapper;
        }

        public int AddWorkHistory(WorkHistoryAddRequest model, int userId)
        {
            int Id = 0;

            string procName = "[dbo].[WorkHistory_Insert]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddWHParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }
                , returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out Id);
                }
            );
            return Id;
        }

        public void UpdateWorkHistory(WorkHistoryUpdateRequest model, int userId)
        {
            string procName = "[dbo].[WorkHistory_Update]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    AddWHParams(model, col, userId);
                }
                , returnParameters: null
            );
        }

        public void DeleteWorkHistory(int deleteWorkHistoryId)
        {
            string procName = "[dbo].[WorkHistory_Delete]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", deleteWorkHistoryId);
                }
                , returnParameters: null
            );
        }

        public WorkHistory GetWorkHistoryById(int id)
        {
            WorkHistory workHistorySelect = null;
            string procName = "[dbo].[WorkHistory_Select_ById]";

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@Id", id);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    workHistorySelect = MapSingleWorkHistory(reader, ref index);
                }
            );
            return workHistorySelect;
        }

        public Paged<WorkHistory> GetWorkHistoryByUserId(int userId, int pageIndex, int pageSize)
        {
            Paged<WorkHistory> pagedList = null;
            int totalCount = 0;

            string procName = "[dbo].[WorkHistory_Select_ByUserId_Paginated]";

            List<WorkHistory> list = null;

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@UserId", userId);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    WorkHistory workHistory = MapSingleWorkHistory(reader, ref index);
                    List<WorkPosition> workPositionList = GetWorkPositionByWorkHistoryId(workHistory.Id);
                    workHistory.WorkPositions = workPositionList;
                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(index++);
                    if (list == null)
                        list = new List<WorkHistory>();
                    list.Add(workHistory);
                }
            );
            if (list != null)
            {
                pagedList = new Paged<WorkHistory>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static void AddWHParams(WorkHistoryAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@CompanyName", model.CompanyName);
            col.AddWithValue("@CompanyContact", model.CompanyContact);
            col.AddWithValue("@CompanyEmail", model.CompanyEmail);
            col.AddWithValue("@CompanyPhone", model.CompanyPhone);
            col.AddWithValue("@LocationId", model.LocationId);
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@IndustryId", model.IndustryId);
            col.AddWithValue("@StartDate", model.StartDate);
            col.AddWithValue("@EndDate", model.EndDate);
        }

        private WorkHistory MapSingleWorkHistory(IDataReader reader, ref int index)
        {
            WorkHistory workHistory = new WorkHistory();
            workHistory.Id = reader.GetSafeInt32(index++);
            workHistory.CompanyName = reader.GetSafeString(index++);
            workHistory.CompanyContact = reader.GetSafeString(index++);
            workHistory.CompanyEmail = reader.GetSafeString(index++);
            workHistory.CompanyPhone = reader.GetSafeString(index++);
            workHistory.LocationId = reader.GetSafeInt32(index++);

            LocationAddress loc = new LocationAddress();
            loc.LineOne = reader.GetSafeString(index++);
            loc.LineTwo = reader.GetSafeString(index++);
            loc.City = reader.GetSafeString(index++);
            loc.Zip = reader.GetSafeString(index++);
            workHistory.Location = loc;
            workHistory.UserId = reader.GetSafeInt32(index++);
            workHistory.Industry = _lookUpMapper.MapSingleLookUp(reader, ref index);
            workHistory.StartDate = reader.GetSafeDateTime(index++);
            workHistory.EndDate = reader.GetSafeDateTime(index++);
            workHistory.DateCreated = reader.GetSafeDateTime(index++);
            workHistory.DateModified = reader.GetSafeDateTime(index++);

            return workHistory;
        }

        public int AddWorkPosition(WorkPositionAddRequest model, int userId)
        {
            int Id = 0;

            string procName = "[dbo].[WorkPositions_Insert]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddWPParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }
                , returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out Id);
                }
            );
            return Id;
        }

        public void UpdateWorkPosition(WorkPositionUpdateRequest model, int userId)
        {
            string procName = "[dbo].[WorkPositions_Update]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    AddWPParams(model, col, userId);
                }
                , returnParameters: null
            );
        }

        public void DeleteWorkPosition(int deleteWorkPositionId)
        {
            string procName = "[dbo].[WorkPositions_Delete]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", deleteWorkPositionId);
                }
                , returnParameters: null
            );
        }

        public WorkPosition GetWorkPositionById(int id)
        {
            WorkPosition workPositionSelect = null;
            string procName = "dbo.WorkPositions_Select_ById";

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@Id", id);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    workPositionSelect = MapSingleWorkPosition(reader, ref index);
                }
            );
            return workPositionSelect;
        }

        public List<WorkPosition> GetWorkPositionByWorkHistoryId(int workHistoryId)
        {

            List<WorkPosition> list = null;
            string procName = "[dbo].[WorkPositions_Select_ByWorkHistoryId]";

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@WorkHistoryId", workHistoryId);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    WorkPosition workPosition = MapSingleWorkPosition(reader, ref index);
                    if (list == null)
                        list = new List<WorkPosition>();
                    list.Add(workPosition);
                }
            );
            return list;
        }

        private static void AddWPParams(WorkPositionAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@WorkHistoryId", model.WorkHistoryId);
            col.AddWithValue("@WageTypeId", model.WageTypeId);
            col.AddWithValue("@JobTypeId", model.JobTypeId);
        }

        private WorkPosition MapSingleWorkPosition(IDataReader reader, ref int index)
        {
            WorkPosition workPosition = new WorkPosition();
            workPosition.Id = reader.GetSafeInt32(index++);
            workPosition.Name = reader.GetSafeString(index++);
            workPosition.Description = reader.GetSafeString(index++);
            workPosition.WorkHistoryId = reader.GetSafeInt32(index++);
            workPosition.WageType = _lookUpMapper.MapSingleLookUp(reader, ref index);
            workPosition.JobType = _lookUpMapper.MapSingleLookUp(reader, ref index);
            workPosition.DateCreated = reader.GetSafeDateTime(index++);
            workPosition.DateModified = reader.GetSafeDateTime(index++);

            return workPosition;
        }
    }
}
