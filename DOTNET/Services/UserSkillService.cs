using Google.Apis.AnalyticsReporting.v4.Data;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.JobSkills;
using Models.Domain.Schools;
using Models.Domain.Users;
using Models.Domain.UserSkills;
using Models.Requests;
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
    public class UserSkillService : IUserSkillService
    {
        private ILookUpService _lookupService;
        private IDataProvider _dataProvider;
        public UserSkillService(ILookUpService lookupService, IDataProvider dataProvider)
        {
            _lookupService = lookupService;
            _dataProvider = dataProvider;
        }

        private static void AddCommonParams(UserSkillsAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@SkillId", model.SkillId);
            col.AddWithValue("@ExperienceLevelId", model.ExperienceLevelId);
            col.AddWithValue("@Years", model.Years);
            col.AddWithValue("@Months", model.Months);
        }

        private UserSkill MapUserSkills(IDataReader reader, ref int startingIndex)
        {
            UserSkill skill = new()
            {
                User = _lookupService.MapLookUp3Col(reader, ref startingIndex),
                Skill = _lookupService.MapSingleLookUp(reader, ref startingIndex),
                Industry = _lookupService.MapSingleLookUp(reader, ref startingIndex),
                Experience = _lookupService.MapLookUp3Col(reader, ref startingIndex),
                Years = reader.GetInt32(startingIndex++),
                Months = reader.GetInt32(startingIndex++),
                DateCreated = reader.GetDateTime(startingIndex++),
                DateModified = reader.GetDateTime(startingIndex++)
            };

            return skill;
        }

        public void Create(UserSkillsAddRequest model, int userId)
        {
            _dataProvider.ExecuteNonQuery("[dbo].[UserSkills_Insert]", delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
            }, null);
        }

        public void CreateBulk(List<UserSkillsAddRequest> models, int userId)
        {
            string procName = "[dbo].[UserSkills_InsertBatch]";
            DataTable dt = MapSingleSkill(models, userId);

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Skills", dt);
                },
                returnParameters: null
                );
        }

        public DataTable MapSingleSkill(List<UserSkillsAddRequest> models, int userId)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("UserId", typeof(int));
            dt.Columns.Add("SkillId", typeof(int));
            dt.Columns.Add("ExperienceLevelId", typeof(int));
            dt.Columns.Add("Years", typeof(int));
            dt.Columns.Add("Months", typeof(int));

            foreach (UserSkillsAddRequest model in models)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, userId);
                dr.SetField(startingIndex++, model.SkillId);
                dr.SetField(startingIndex++, model.ExperienceLevelId);
                dr.SetField(startingIndex++, model.Years);
                dr.SetField(startingIndex++, model.Months);
                dt.Rows.Add(dr);
            }
            return dt;
        }

        public void Update(UserSkillsAddRequest model, int userId)
        {
            _dataProvider.ExecuteNonQuery("[dbo].[UserSkills_Update]", delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
            }, null);
        }

        public void Delete(int userId, int skillId)
        {
            _dataProvider.ExecuteNonQuery("[dbo].[UserSkills_Delete]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@SkillId", skillId);

            });
        }

        public List<UserSkill> GetAll()
        {
            List<UserSkill> userSkillsList = null;
            _dataProvider.ExecuteCmd("[dbo].[UserSkills_SelectAll]", null, delegate (IDataReader reader, short set)
            {
                int idx = 0;
                UserSkill individual = MapUserSkills(reader, ref idx);

                userSkillsList ??= new List<UserSkill>();
                userSkillsList.Add(individual);
            });
            return userSkillsList;
        }

        public Paged<UserSkill> GetByUserId(int userId, int pageIndex, int pageSize)
        {
            Paged<UserSkill> pagedList = null;
            List<UserSkill> list = null;
            int totalCount = 0;
            _dataProvider.ExecuteCmd("[dbo].[UserSkills_SelectById]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int idx = 0;
                UserSkill individual = MapUserSkills(reader, ref idx);
                totalCount = reader.GetSafeInt32(idx++);
                list ??= new List<UserSkill>();
                list.Add(individual);
            });
            if (list != null)
            {
                pagedList = new Paged<UserSkill>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<UserSkill> GetSearchPagination(string query, int pageIndex, int pageSize)
        {
            Paged<UserSkill> pagedList = null;
            List<UserSkill> list = null;
            int totalCount = 0;
            _dataProvider.ExecuteCmd("[dbo].[UserSkills_Search_Paginated]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Query", query);
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int idx = 0;
                UserSkill individual = MapUserSkills(reader, ref idx);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(idx++);
                }
                list ??= new List<UserSkill>();
                list.Add(individual);
            });
            if (list != null)
            {
                pagedList = new Paged<UserSkill>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
    }
}
