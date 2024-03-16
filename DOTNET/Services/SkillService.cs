using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Skills;
using Models.Requests.Skills;
using Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Services
{
    public class SkillService : ISkillService
    {
        IDataProvider _data = null;
        public SkillService(IDataProvider data)
        {
            _data = data;
        }

        // Insert skill
        public int AddSkill(SkillAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Skills_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@CreatedBy", userId);

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

        // Update skill
        public void UpdateSkill(SkillUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Skills_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                    collection.AddWithValue("@IsDeleted", model.IsDeleted);
                    collection.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }

        // Insert/ Update values
        private static void AddCommonParams(SkillAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Name", model.Name);
            collection.AddWithValue("@Description", (object)model.Description ?? DBNull.Value);
            collection.AddWithValue("@IndustryId", model.IndustryId);
        }

        // Update skill is deleted
        public void DeleteSkill(int userId, int id)
        {
            string procName = "[dbo].[Skills_Update_IsDeleted]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                    collection.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }

        // Update skill is approved
        public void UpdateSkillIsApproved(SkillUpdateIsApprovedRequest model, int userId)
        {
            string procName = "[dbo].[Skills_Update_IsApproved]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", model.Id);
                    collection.AddWithValue("@IsApproved", model.IsApproved);
                    collection.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }

        // Get skill by skill Id
        public Skill GetSkillById(int id)
        {
            string procName = "[dbo].[Skills_Select_ById]";

            Skill skill = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    skill = MapSingleSkill(reader, ref startingIndex);
                });
            return skill;
        }

        // Get paginated
        public Paged<Skill> GetSkillPaged(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Skills_Select_Paged]";
            Paged<Skill> pagedList = null;
            List<Skill> list = null;
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
                    Skill skill = MapSingleSkill(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Skill>();
                    }
                    list.Add(skill);
                });
            if (list != null)
            {
                pagedList = new Paged<Skill>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        // Get skill by Industry Id
        public List<Skill> GetSkillByIndustryId(int industryId)
        {
            string procName = "[dbo].[Skills_Select_ByIndustryId]";

            List<Skill> skillList = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@IndustryId", industryId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Skill skill = MapSingleSkill(reader, ref startingIndex);
                    if (skillList == null)
                    {
                        skillList = new List<Skill>();
                    }
                    skillList.Add(skill);
                });
            return skillList;
        }

        // Map one record for all Gets
        private static Skill MapSingleSkill(IDataReader reader, ref int startingIndex)
        {
            Skill aSkill = new Skill();
            aSkill.Industry = new LookUp();

            aSkill.Id = reader.GetSafeInt32(startingIndex++);
            aSkill.Name = reader.GetSafeString(startingIndex++);
            aSkill.Description = reader.GetSafeString(startingIndex++);
            aSkill.Industry.Id = reader.GetSafeInt32(startingIndex++);
            aSkill.Industry.Name = reader.GetSafeString(startingIndex++);
            aSkill.IsDeleted = reader.GetSafeBool(startingIndex++);
            aSkill.IsApproved = reader.GetSafeBool(startingIndex++);
            aSkill.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aSkill.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aSkill.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aSkill.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aSkill;
        }

        // Get all skills where IsDeleted = 0
        public List<BaseSkill> GetALLSkills()
        {
            string procName = "[dbo].[Skills_SelectAll]";

            List<BaseSkill> skillList = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    BaseSkill skill = BaseSkillMapper(reader, ref startingIndex);

                    if (skillList == null)
                    {
                        skillList = new List<BaseSkill>();
                    }
                    skillList.Add(skill);
                });
            return skillList;
        }

        private static BaseSkill BaseSkillMapper(IDataReader reader, ref int startingIndex)
        {
            BaseSkill aSkill = new BaseSkill();
            aSkill.Industry = new LookUp();

            aSkill.Id = reader.GetSafeInt32(startingIndex++);
            aSkill.Name = reader.GetSafeString(startingIndex++);
            aSkill.Industry.Id = reader.GetSafeInt32(startingIndex++);
            aSkill.Industry.Name = reader.GetSafeString(startingIndex++);
            return aSkill;
        }
    }
}
