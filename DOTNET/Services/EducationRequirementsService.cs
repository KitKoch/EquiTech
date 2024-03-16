using Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.EducationRequirements;
using Data;
using Services.Interfaces;
using Models.Requests.EduReqRequests;
using System.Runtime.ConstrainedExecution;
using Models;
using System.Collections;

namespace Services
{
    public class EducationRequirementsService : IEducationRequirementsService
    {
        IDataProvider _data = null;
        public EducationRequirementsService(IDataProvider data)
        {
            _data = data;
        }

        public void DeleteJobEduReq(int id)
        {
            string procName = "[dbo].[JobEducationRequirements_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@JobId", id);
            }, returnParameters: null
            );
        }
        public void UpdateJobEduReq(EduReqRequest model)
        {
            string procName = "[dbo].[JobEducationRequirements_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                JobEduReqParams(model, col);

            }, returnParameters: null);
        }
        public int AddJobEduReq(EduReqRequest model, int currentUserId)
        {
            string procName = "[dbo].[JobEducationRequirements_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                JobEduReqParams(model, col);
                col.AddWithValue("@CreatedBy", currentUserId);

            }, returnParameters: null);
            return currentUserId;
        }
        public Paged<JobEduReq> GetByEduReqId(int id, int pageIndex, int pageSize)
        {
            Paged<JobEduReq> pagedList = null;
            List<JobEduReq> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[JobEducationRequirements_Select_ByEducationRequirementId]",
                (param) =>
                {
                    param.AddWithValue("@EducationRequirementId", id);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    JobEduReq jobEduReq = MapEduReq(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<JobEduReq>();
                    }
                    list.Add(jobEduReq);
                });
            if (list != null)
            {
                pagedList = new Paged<JobEduReq>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<JobEduReq> GetByOrgId(int id, int pageIndex, int pageSize)
        {
            Paged<JobEduReq> pagedList = null;
            List<JobEduReq> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[JobEducationRequirements_Select_ByOrgId]",
                (param) =>
                {
                    param.AddWithValue("@OrganizationId", id);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    JobEduReq jobEduReq = MapEduReq(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<JobEduReq>();
                    }
                    list.Add(jobEduReq);
                });
            if (list != null)
            {
                pagedList = new Paged<JobEduReq>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public List<JobEduReq> GetByJobId(int id)
        {
            List<JobEduReq> list = null;
            string procName = "[dbo].[JobEducationRequirements_Select_ByJobId]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@JobId", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                JobEduReq jobEduReq = new JobEduReq();
                jobEduReq.Name = reader.GetSafeString(startingIndex++);
                jobEduReq.JobTitle = reader.GetSafeString(startingIndex++);
                jobEduReq.EducationRequirementId = reader.GetSafeInt32(startingIndex++);
                jobEduReq.OrganizationId = reader.GetSafeInt32(startingIndex++);
                jobEduReq.JobId = reader.GetSafeInt32(startingIndex++);
                jobEduReq.DateCreated = reader.GetDateTime(startingIndex++);
                jobEduReq.CreatedBy = reader.GetSafeInt32(startingIndex++);

                if (list == null)
                {
                    list = new List<JobEduReq>();
                }

                list.Add(jobEduReq);
            }
            );
            return list;
        }
        public void Update(EduReqUpdateRequest model, int currentUserId)
        {
            string procName = "[dbo].[EducationRequirements_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, currentUserId);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }
        public void UpdateIsDeleted(int id, int currentUserId)
        {
            string procName = "[dbo].[EducationRequirements_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@ModifiedBy", currentUserId);

            }, returnParameters: null);
        }
        public int Add(EduReqAddRequest model, int currentUserId)
        {
            int id = 0;
            string procName = "[dbo].[EducationRequirements_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col, currentUserId);
                col.AddWithValue("@CreatedBy", currentUserId);

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

        public List<EducationRequirement> GetAll()
        {
            List<EducationRequirement> list = null;
            string procName = "[dbo].[EducationRequirements_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                EducationRequirement edReq = MapEduReq(reader);

                if (list == null)
                {
                    list = new List<EducationRequirement>();
                }

                list.Add(edReq);
            }
           );
            return list;
        }
        public EducationRequirement GetById(int id)
        {
            string procName = "[dbo].[EducationRequirements_SelectById]";

            EducationRequirement eduReq = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {


                eduReq = MapEduReq(reader);
            }
            );
            return eduReq;
        }
        public static EducationRequirement MapEduReq(IDataReader reader)
        {
            EducationRequirement edReq = new EducationRequirement();
            int startingIndex = 0;
            edReq.Id = reader.GetInt32(startingIndex++);
            edReq.Name = reader.GetString(startingIndex++);
            edReq.Description = reader.GetString(startingIndex++);
            edReq.EducationLevelId = reader.GetInt32(startingIndex++);
            edReq.DegreeId = reader.GetInt32(startingIndex++);
            edReq.OrganizationId = reader.GetInt32(startingIndex++);
            edReq.IsExperienceAllowed = reader.GetSafeBool(startingIndex++);
            edReq.MinYears = reader.GetInt32(startingIndex++);
            edReq.CreatedBy = reader.GetInt32(startingIndex++);
            edReq.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            edReq.DateCreated = reader.GetSafeDateTime(startingIndex++);
            edReq.DateModified = reader.GetSafeDateTime(startingIndex++);
            edReq.IsDeleted = reader.GetSafeBool(startingIndex++);
            return edReq;
        }
        private static void AddCommonParams(EduReqAddRequest model, SqlParameterCollection col, int currentUserId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@EducationLevelId", model.EducationLevelId);
            col.AddWithValue("@DegreeId", model.DegreeId);
            col.AddWithValue("@MinYears", model.MinYears);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@IsExperienceAllowed", model.IsExperienceAllowed);
            col.AddWithValue("@ModifiedBy", currentUserId);
        }
        private static void JobEduReqParams(EduReqRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@JobId", model.JobId);
            col.AddWithValue("@EducationRequirementId", model.EducationRequirementId);
        }
        public static JobEduReq MapEduReq(IDataReader reader, ref int startingIndex)
        {
            JobEduReq jer = new JobEduReq();
            jer.Name = reader.GetSafeString(startingIndex++);
            jer.JobTitle = reader.GetSafeString(startingIndex++);
            jer.EducationRequirementId = reader.GetSafeInt32(startingIndex++);
            jer.OrganizationId = reader.GetSafeInt32(startingIndex++);
            jer.JobId = reader.GetSafeInt32(startingIndex++);
            jer.DateCreated = reader.GetDateTime(startingIndex++);
            jer.CreatedBy = reader.GetSafeInt32(startingIndex++);
            return jer;
        }

    }
}
