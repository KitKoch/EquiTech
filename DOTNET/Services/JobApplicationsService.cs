using Data.Providers;
using Models.Requests.Locations;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Requests.JobApplications;
using Services.Interfaces;
using Models.Domain.JobApplications;
using Data;
using Models.Domain;
using Models;
using System.Reflection;
using Models.Domain.Jobs;
using Models.Domain.Organizations;

namespace Services
{
    public class JobApplicationsService : IJobApplicationsService
    {
        IDataProvider _data = null;
        IBaseUserMapper _baseUserMapper = null;
        IFileMapper _fileMapper = null;
        ILookUpService _lookUpService = null;

        public JobApplicationsService(IDataProvider data, IBaseUserMapper baseUserMapper, IFileMapper fileMapper, ILookUpService lookUpMapper)
        {
            _data = data;
            _baseUserMapper = baseUserMapper;
            _fileMapper = fileMapper;
            _lookUpService = lookUpMapper;
        }

        public int Add(JobApplicationAddRequest jobApplication, int userId)
        {
            int id = 0;
            string procName = "[dbo].[JobApplications_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(jobApplication, coll);
                    coll.AddWithValue("@CreatedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
                );

            return id;
        }

        public void Update(JobApplicationUpdateRequest jobApplication)
        {
            string procName = "[dbo].[JobApplications_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddUpdateParams(jobApplication, coll);
                },
                returnParameters: null
                );
        }


        public void UpdateIsWithdrawn(int jobId)
        {
            string procName = "[dbo].[JobApplications_Update_IsWithdrawn]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", jobId);
                },
                returnParameters: null
                );
        }

        public void UpdateStatus(JobApplicationUpdateStatusRequest jobStatus)
        {
            string procName = "[dbo].[JobApplications_Update_Status]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", jobStatus.Id);
                    coll.AddWithValue("@StatusId", jobStatus.StatusId);
                },
                returnParameters: null
                );
        }

        public JobApplication Get(int id)
        {
            string procName = "[dbo].[JobApplications_Select_ById]";
            JobApplication jobApplication = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    jobApplication = MapSingleApplication(reader, ref index);
                }
                );

            return jobApplication;
        }

        public Paged<JobApplication> GetPaginatedByCreatedBy(int pageIndex, int pageSize, int CreatedBy)
        {
            Paged<JobApplication> pagedlist = null;
            List<JobApplication> list = null;
            int totalCount = 0;
            string procName = "[dbo].[JobApplications_Select_Paged_ByCreatedBy]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                    paramColl.AddWithValue("@CreatedBy", CreatedBy);
                }
                ,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    JobApplication aJobApplication = MapSingleApplication(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<JobApplication>();
                    }

                    list.Add(aJobApplication);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<JobApplication>(list, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public Paged<JobApplication> GetPaginatedByJobId(int pageIndex, int pageSize, int JobId)
        {
            Paged<JobApplication> pagedlist = null;
            List<JobApplication> list = null;
            int totalCount = 0;
            string procName = "[dbo].[JobApplications_Select_Paged_ByJobId]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                    paramColl.AddWithValue("@JobId", JobId);
                }
                ,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    JobApplication aJobApplication = MapSingleApplication(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<JobApplication>();
                    }

                    list.Add(aJobApplication);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<JobApplication>(list, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[JobApplications_Delete]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }

        public Paged<JobApplicationV2> GetPaginatedByOrgId(int pageIndex, int pageSize, int organizationId)
        {
            Paged<JobApplicationV2> pagedlist = null;
            List<JobApplicationV2> applicationlist = null;
            int totalCount = 0;
            string procName = "[dbo].[JobApplications_ByOrgId_Paginated]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                    paramColl.AddWithValue("@OrganizationId", organizationId);
                }
                ,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    JobApplicationV2 aJobApplication = MapSingleApplicationV2(reader, ref startingIndex);


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (applicationlist == null)
                    {
                        applicationlist = new List<JobApplicationV2>();
                    }

                    applicationlist.Add(aJobApplication);
                }
                );
            if (applicationlist != null)
            {
                pagedlist = new Paged<JobApplicationV2>(applicationlist, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public Paged<JobApplicationV2> SearchJobApplicationsByOrgId(int pageIndex, int pageSize, int organizationId, string query)
        {
            Paged<JobApplicationV2> pagedList = null;
            List<JobApplicationV2> list = null;
            string procName = "[dbo].[JobApplications_ByOrgId_Search_Paginated]";

            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@pageIndex", pageIndex);
                    paramColl.AddWithValue("@pageSize", pageSize);
                    paramColl.AddWithValue("@organizationId", organizationId);
                    paramColl.AddWithValue("@query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIdex = 0;
                    JobApplicationV2 aJobApplication = MapSingleApplicationV2(reader, ref startingIdex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIdex++);
                    }

                    if (list == null)
                    {
                        list = new List<JobApplicationV2>();
                    }
                    list.Add(aJobApplication);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<JobApplicationV2>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private JobApplicationV2 MapSingleApplicationV2(IDataReader reader, ref int startingIndex)
        {
            JobApplicationV2 aJobApplication = new JobApplicationV2();

            aJobApplication.Id = reader.GetSafeInt32(startingIndex++);
            aJobApplication.Job = new BaseJobV2();
            aJobApplication.Job.Id = reader.GetSafeInt32(startingIndex++);
            aJobApplication.Job.Title = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Description = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Requirements = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Type = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aJobApplication.Job.JobStatus = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aJobApplication.Job.RemoteStatus = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aJobApplication.Job.Organization = new BaseOrganization();
            aJobApplication.Job.Organization.Id = reader.GetSafeInt32(startingIndex++);
            aJobApplication.Job.Organization.Name = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Organization.Headline = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Organization.Description = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Organization.Logo = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Organization.Phone = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.Organization.SiteUrl = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.ContactName = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.ContactPhone = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.ContactEmail = reader.GetSafeString(startingIndex++);
            aJobApplication.Job.EstimatedStartDate = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.Job.EstimatedFinishDate = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.Job.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.Job.DateModified = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.Job.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aJobApplication.Job.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aJobApplication.Status = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aJobApplication.IsWithdrawn = reader.GetSafeBool(startingIndex++);
            aJobApplication.CreatedBy = _baseUserMapper.MapUser(reader, ref startingIndex);
            aJobApplication.Email = reader.GetSafeString(startingIndex++);
            aJobApplication.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.DateModified = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.PendingStatusCount = reader.GetSafeInt32(startingIndex++);
            aJobApplication.AcceptedStatusCount = reader.GetSafeInt32(startingIndex++);
            aJobApplication.NegotiationStatusCount = reader.GetSafeInt32(startingIndex++);
            aJobApplication.OfferedStatusCount = reader.GetSafeInt32(startingIndex++);
            aJobApplication.EmployedStatusCount = reader.GetSafeInt32(startingIndex++);
            aJobApplication.RejectedStatusCount = reader.GetSafeInt32(startingIndex++);
            return aJobApplication;
        }

        private JobApplication MapSingleApplication(IDataReader reader, ref int startingIndex)
        {
            JobApplication aJobApplication = new JobApplication();

            aJobApplication.Id = reader.GetSafeInt32(startingIndex++);

            aJobApplication.Job = new BaseJob();
            aJobApplication.Job.Id = reader.GetSafeInt32(startingIndex++);
            aJobApplication.Job.Title = reader.GetSafeString(startingIndex++);

            aJobApplication.Job.Type = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            aJobApplication.Job.JobStatus = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            aJobApplication.Job.RemoteStatus = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            aJobApplication.ResumeFile = _fileMapper.MapFile(reader, ref startingIndex);

            aJobApplication.Status = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            aJobApplication.IsWithdrawn = reader.GetSafeBool(startingIndex++);

            aJobApplication.CreatedBy = _baseUserMapper.MapUser(reader, ref startingIndex);

            aJobApplication.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aJobApplication.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aJobApplication;
        }

        private static void AddUpdateParams(JobApplicationUpdateRequest jobApplication, SqlParameterCollection coll)
        {
            coll.AddWithValue("@ResumeFileId", jobApplication.ResumeFileId);
            coll.AddWithValue("@Id", jobApplication.Id);
        }

        private static void AddCommonParams(JobApplicationAddRequest jobApplication, SqlParameterCollection coll)
        {
            coll.AddWithValue("@JobId", jobApplication.JobId);
            coll.AddWithValue("@ResumeFileId", jobApplication.ResumeFileId);
            coll.AddWithValue("@IsWithdrawn", jobApplication.IsWithdrawn);
        }
    }
}
