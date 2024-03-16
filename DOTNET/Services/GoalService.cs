using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.CandidatePreferences;
using Models.Domain.Goals;
using Models.Domain.Skills;
using Models.Requests.Goals;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class GoalService : IGoalService
    {
        IDataProvider _dataProvider = null;
        IBaseUserMapper _userMapper = null;
        public GoalService(IDataProvider dataProvider, IBaseUserMapper userMapper)
        {
            _dataProvider = dataProvider;
            _userMapper = userMapper;
        }
        public int AddGoal(GoalAddRequest model, int userId)
        {
            int id = 0;
            DataTable myParamValue = null;
            if (model.GoalValues.Count() > 0)
            {
                myParamValue = MapGoalValuesToTable(model.GoalValues);
            }

            string procName = "[dbo].[Goals_Insert]";
            _dataProvider.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, myParamValue);
                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }
        public Goal Get(int id)
        {
            string procName = "[dbo].[Goals_Select_ById]";
            Goal goal = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIdex = 0;
                goal = MapSingleGoal(reader, ref startingIdex);
            });

            return goal;
        }
        public void Update(GoalUpdateRequest model, int userId)
        {
            DataTable myParamValue = null;
            if (model.GoalValues.Count() > 0)
            {
                myParamValue = MapGoalValuesToTable(model.GoalValues);
            }

            string procName = "[dbo].[Goals_Update]";
            _dataProvider.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, myParamValue);
                col.AddWithValue("@PreferenceId", model.PreferenceId);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }
        public void UpdateIsCompleted(int id)
        {
            string procName = "[dbo].[Goals_Update_IsCompleted]";
            _dataProvider.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }
        public void Delete(int Id)
        {
            string procName = "[dbo].[Goals_Update_IsDeleted]";
            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", Id);
                },
                returnParameters: null);
        }
        public Paged<Goal> GetByCreatedBy(int id, int pageIndex, int pageSize)
        {
            Paged<Goal> pagedList = null;
            List<Goal> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "dbo.Goals_Select_ByCreatedBy",
                (param) =>
                {
                    param.AddWithValue("@CreatedBy", id);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIdex = 0;
                    Goal goal = MapSingleGoal(reader, ref startingIdex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIdex++);
                    }

                    if (list == null)
                    {
                        list = new List<Goal>();
                    }
                    list.Add(goal);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Goal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Goal> GetAll(bool completed, decimal minPay, decimal maxPay, int pageIndex, int pageSize)
        {
            Paged<Goal> pagedList = null;
            List<Goal> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "dbo.Goals_SelectAll",
                (param) =>
                {
                    param.AddWithValue("@MinimumPay", minPay);
                    param.AddWithValue("@MaximumPay", maxPay);
                    param.AddWithValue("@IsCompleted", completed);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIdex = 0;
                    Goal goal = MapSingleGoal(reader, ref startingIdex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIdex++);
                    }

                    if (list == null)
                    {
                        list = new List<Goal>();
                    }
                    list.Add(goal);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Goal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Goal> SearchGoalsByCandidate(bool completed, string query, int pageIndex, int pageSize)
        {
            Paged<Goal> pagedList = null;
            List<Goal> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "dbo.Goals_SearchBy_Candidate",
                (param) =>
                {
                    param.AddWithValue("@IsCompleted", completed);
                    param.AddWithValue("@Query", query);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIdex = 0;
                    Goal goal = MapSingleGoal(reader, ref startingIdex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIdex++);
                    }

                    if (list == null)
                    {
                        list = new List<Goal>();
                    }
                    list.Add(goal);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Goal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Goal> FilterByDesiredPay(string query, bool completed, decimal minPay, decimal maxPay, int pageIndex, int pageSize)
        {
            Paged<Goal> pagedList = null;
            List<Goal> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "dbo.Goals_FilterBy_DesiredPay",
                (param) =>
                {
                    param.AddWithValue("@Query", query);
                    param.AddWithValue("@IsCompleted", completed);
                    param.AddWithValue("@MinimumPay", minPay);
                    param.AddWithValue("@MaximumPay", maxPay);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIdex = 0;
                    Goal goal = MapSingleGoal(reader, ref startingIdex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIdex++);
                    }

                    if (list == null)
                    {
                        list = new List<Goal>();
                    }
                    list.Add(goal);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Goal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private Goal MapSingleGoal(IDataReader reader, ref int startingIdex)
        {
            Goal aGoal = new Goal();


            aGoal.Id = reader.GetSafeInt32(startingIdex++);
            aGoal.Name = reader.GetSafeString(startingIdex++);
            aGoal.Statement = reader.GetSafeString(startingIdex++);

            aGoal.PaymentPreference = new BasePreference();
            aGoal.PaymentPreference.Id = reader.GetSafeInt32(startingIdex++);
            aGoal.PaymentPreference.MinimumPay = reader.GetSafeDecimal(startingIdex++);
            aGoal.PaymentPreference.DesiredPay = reader.GetSafeDecimal(startingIdex++);
            aGoal.PaymentPreference.IsHourly = reader.GetSafeBool(startingIdex++);
            aGoal.Priority = reader.GetSafeInt32(startingIdex++);
            aGoal.YearsToGoal = reader.GetSafeInt32(startingIdex++);
            aGoal.IsCompleted = reader.GetSafeBool(startingIdex++);
            aGoal.IsDeleted = reader.GetSafeBool(startingIdex++);
            aGoal.CreatedBy = _userMapper.MapUser(reader, ref startingIdex);
            aGoal.DateCreated = reader.GetSafeDateTime(startingIdex++);
            aGoal.DateModified = reader.GetSafeDateTime(startingIdex++);
            aGoal.GoalValues = reader.DeserializeObject<List<LookUp>>(startingIdex++);

            return aGoal;
        }
        private static void AddCommonParams(GoalAddRequest model, SqlParameterCollection col, DataTable myParamValue)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Statement", model.Statement);
            col.AddWithValue("@MinimumPay", model.MinimumPay);
            col.AddWithValue("@DesiredPay", model.DesiredPay);
            col.AddWithValue("@IsHourly", model.IsHourly);
            col.AddWithValue("@Priority", model.Priority);
            col.AddWithValue("@YearsToGoal", model.YearsToGoal);
            col.AddWithValue("@BatchGoalValues", myParamValue);
        }
        private DataTable MapGoalValuesToTable(List<int> goalValuesToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("PersonalValueId", typeof(int));

            foreach (int singleGoalValue in goalValuesToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleGoalValue);

                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}
