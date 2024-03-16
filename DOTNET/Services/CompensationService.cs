using Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging.Console;

using Services.Interfaces;
using Models.Domain.Compensations;
using Data;
using Models;
using Models.Requests.Compensations;
using Models.Domain;
using System.Xml.Linq;
using Stripe;
using Models.Domain.Organizations;
using Models.Domain.Blogs;
using Models.Domain.CompensationTypeLabels;
using Models.Requests.CompensationType;
using Models.Domain.Locations;
using Models.Requests;
using System.ComponentModel.DataAnnotations;

namespace Services
{
    public class CompensationService : ICompensationService
    {
        IDataProvider _data = null;
        private static ILookUpService _lookUpService = null;

        public CompensationService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        #region Elements
        public CompensationElement SelectByElementId(int id)
        {
            const string procName = "[dbo].[CompensationElements_SelectById]";
            CompensationElement element = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@CompElementId", id);

            }, delegate (IDataReader reader, short set)
            {
                int startIndex = 0;
                element = MapSingleElement(reader, ref startIndex);

            }
            );

            return element;

        }

        public List<CompensationElement> SelectByCompPackageId(int compPackageId)
        {
            const string procName = "[dbo].[CompensationElements_SelectByCompPackageId]";
            List<CompensationElement> compensationElements = null;


            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {

                    paramCollection.AddWithValue("@CompPackageId", compPackageId);

                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startIndex = 0;
                    CompensationElement compensationElement = MapSingleElement(reader, ref startIndex);

                    if (compensationElements == null)
                    {
                        compensationElements = new List<CompensationElement>();
                    }
                    compensationElements.Add(compensationElement);

                }
            );

            return compensationElements;

        }


        private static CompensationElement MapSingleElement(IDataReader reader, ref int startIndex)
        {
            CompensationElement element = new CompensationElement();

            element.Organization = new Organization();
            element.User = new BaseUser();
            LookUp lookUp = new LookUp();

            element.CompElementId = reader.GetSafeInt32(startIndex++);

            element.Organization.Id = reader.GetSafeInt32(startIndex++);
            element.User.Id = reader.GetSafeInt32(startIndex++);
            element.User.Id = reader.GetSafeInt32(startIndex++);

            element.IsDeleted = reader.GetSafeBool(startIndex++);
            element.Description = reader.GetSafeString(startIndex++);
            element.NumericValue = reader.GetSafeInt32(startIndex++);

            element.CompensationPackage = new LookUp();
            element.CompensationPackage.Id = reader.GetInt32(startIndex++);
            element.CompensationPackage.Name = reader.GetSafeString(startIndex++);

            element.CompensationLabel = new LookUp();
            element.CompensationLabel.Id = reader.GetSafeInt32(startIndex++);
            element.CompensationLabel.Name = reader.GetSafeString(startIndex++);

            element.CompensationType = new LookUp();
            element.CompensationType.Id = reader.GetSafeInt32(startIndex++);
            element.CompensationType.Name = reader.GetSafeString(startIndex++);

            return element;
        }

        public int AddElement(CompensationElementAddRequest request)
        {
            const string procName = "[dbo].[CompensationElements_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonElementParams(request, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                }
            );

            return id;
        }

        public void UpdateElement(CompensationElementUpdateRequest updateRequest)
        {
            const string procName = "[dbo].[CompensationElements_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonElementParams(updateRequest, col);
                    col.AddWithValue("@Id", updateRequest.Id);
                },
                returnParameters: null
            );
        }

        public void DeleteElement(int id)
        {
            const string procName = "[dbo].[CompensationElements_Delete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null
            );
        }

        public void DeleteElementsByPackageId(int id)
        {
            const string procName = "[dbo].[CompensationElements_DeleteByPackageId]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@CompPackageId", id);
                },
                returnParameters: null
            );
        }

        private static void AddCommonElementParams(CompensationElementAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@CompensationPackageId", request.CompensationPackageId);
            col.AddWithValue("@CompensationTypeId", request.CompensationTypeId);
            col.AddWithValue("@CompensationLabelId", request.CompensationLabelId);
            col.AddWithValue("@NumericValue", request.NumericValue);
        }

        public void BatchElementInsert(List<CompensationElementAddRequest> models, int userId)
        {
            string procName = "[dbo].[CompensationElements_BatchInsert]";
            DataTable dt = MapSingleSkill(models, userId);

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@BatchElements", dt);
                },
                returnParameters: null
                );
        }

        public DataTable MapSingleSkill(List<CompensationElementAddRequest> models, int userId)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("CompensationPackageId", typeof(int));
            dt.Columns.Add("CompensationTypeId", typeof(int));
            dt.Columns.Add("CompensationLabelId", typeof(int));
            dt.Columns.Add("NumericValue", typeof(int));

            foreach (CompensationElementAddRequest model in models)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, model.CompensationPackageId);
                dr.SetField(startingIndex++, model.CompensationTypeId);
                dr.SetField(startingIndex++, model.CompensationLabelId);
                dr.SetField(startingIndex++, model.NumericValue);
                dt.Rows.Add(dr);

            }
            return dt;
        }
        #endregion

        #region Packages


        public CompensationPackage SelectByPackageId(int id)
        {
            CompensationPackage package = null;
            const string procName = "[dbo].[CompensationPackages_SelectById]";

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {

                    paramCollection.AddWithValue("@CompPackageId", id);

                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    package = MapSinglePackage(reader, ref startingIndex);

                }
            );

            return package;

        }


        public Paged<CompensationPackage> SelectByOrgIdPaged(int pageIndex, int pageSize, int orgId)
        {
            const string procName = "[dbo].[CompensationPackages_SelectByOrgId]";

            Paged<CompensationPackage> pagedList = null;
            List<CompensationPackage> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection inputParams)
                {
                    inputParams.AddWithValue("@PageIndex", pageIndex);
                    inputParams.AddWithValue("@PageSize", pageSize);
                    inputParams.AddWithValue("@OrgId", orgId);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    CompensationPackage package = MapSinglePackage(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (list == null)
                    {
                        list = new List<CompensationPackage>();
                    }

                    list.Add(package);
                }
                );

            if (list != null)
            {
                pagedList = new Paged<CompensationPackage>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        private static CompensationPackage MapSinglePackage(IDataReader reader, ref int startingIndex)
        {
            CompensationPackage package = new CompensationPackage();
            package.User = new BaseUser();

            package.CompPackage = new LookUp();
            package.CompPackage.Id = reader.GetInt32(startingIndex++);
            package.CompPackage.Name = reader.GetSafeString(startingIndex++);

            package.Description = reader.GetSafeString(startingIndex++);

            package.Organization = new LookUp();
            package.Organization.Id = reader.GetSafeInt32(startingIndex++);
            package.Organization.Name = reader.GetSafeString(startingIndex++);

            package.User.Id = reader.GetSafeInt32(startingIndex++);
            package.User.Id = reader.GetSafeInt32(startingIndex++);

            return package;
        }

        public int AddPackage(CompensationPackageAddRequest request, int currentUserId)
        {
            int id = 0;

            string procName = "[dbo].[CompensationPackages_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonPackageParams(request, col, currentUserId);
                    col.AddWithValue("@CreatedBy", currentUserId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                    Console.WriteLine("");
                }
            );

            return id;
        }
        public void UpdatePackage(CompensationPackageUpdateRequest updateRequest, int currentUserId)
        {
            const string procName = "[dbo].[CompensationPackages_UpdateV2]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonPackageParams(updateRequest, col, currentUserId);
                    col.AddWithValue("@CompPackageId", updateRequest.Id);
                },
                returnParameters: null
            );
        }

        public void SoftDelete(int id)
        {
            const string procName = "[dbo].[CompensationPackages_SoftDelete]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, returnParameters: null
            );
        }

        public void DeletePackage(int id)
        {
            const string procName = "[dbo].[CompensationPackages_Delete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null
            );
        }

        private static void AddCommonPackageParams(CompensationPackageAddRequest request, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@OrgId", request.OrgId);
            col.AddWithValue("@Name", request.Name);
            col.AddWithValue("@Description", request.Description);
            col.AddWithValue("@ModifiedBy", userId);
        }
        #endregion

        #region JobCompensations
        public List<JobCompensation> SelectByJobId(int JobId)
        {
            List<JobCompensation> list = null;


            const string procName = "[dbo].[JobCompensations_SelectById]";


            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@JobId", JobId);

                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startIndex = 0;
                    JobCompensation jobCompensation = new JobCompensation();

                    jobCompensation = MapSingleJobCompensation(reader, ref startIndex);

                    if (list == null)
                    {
                        list = new List<JobCompensation>();
                    }
                    list.Add(jobCompensation);
                }
            );

            return list;

        }
        public JobCompensation SelectByJobandCompId(int JobId, int CompId)
        {
            JobCompensation jobCompensation = null;

            const string procName = "[dbo].[JobCompensations_SelectByJobAndCompId]";


            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@JobId", JobId);
                    paramCollection.AddWithValue("@CompensationPackageId", CompId);

                },
                delegate (IDataReader reader, short set)
                {
                    int startIndex = 0;
                    jobCompensation = MapSingleJobCompensation(reader, ref startIndex);

                }
            );

            return jobCompensation;

        }
        private static JobCompensation MapSingleJobCompensation(IDataReader reader, ref int startIndex)
        {
            JobCompensation jobCompensation = new JobCompensation();
            JobCompensationPackage jobCompensationPackage = new JobCompensationPackage();
            Job aJob = new Job();

            aJob.Id = reader.GetSafeInt32(startIndex++);
            aJob.Title = reader.GetSafeString(startIndex++);
            aJob.Description = reader.GetSafeString(startIndex++);
            aJob.Requirements = reader.GetSafeString(startIndex++);
            aJob.JobType = _lookUpService.MapSingleLookUp(reader, ref startIndex);
            aJob.JobStatus = _lookUpService.MapSingleLookUp(reader, ref startIndex);
            aJob.Organization = new BaseOrganization();
            aJob.Organization.Id = reader.GetSafeInt32(startIndex++);
            aJob.Organization.Name = reader.GetSafeString(startIndex++);
            aJob.Organization.Headline = reader.GetSafeString(startIndex++);
            aJob.Organization.Description = reader.GetSafeString(startIndex++);
            aJob.Organization.Logo = reader.GetSafeString(startIndex++);
            aJob.Organization.Phone = reader.GetSafeString(startIndex++);
            aJob.Organization.SiteUrl = reader.GetSafeString(startIndex++);
            aJob.Location = new Location();
            aJob.Location.Id = reader.GetSafeInt32(startIndex++);
            aJob.Location.LineOne = reader.GetSafeString(startIndex++);
            aJob.Location.LineTwo = reader.GetSafeString(startIndex++);
            aJob.Location.City = reader.GetSafeString(startIndex++);
            aJob.Location.Zip = reader.GetSafeString(startIndex++);
            aJob.Location.Latitude = reader.GetSafeDouble(startIndex++);
            aJob.Location.Longitude = reader.GetSafeDouble(startIndex++);
            aJob.Location.LocationType = _lookUpService.MapSingleLookUp(reader, ref startIndex);
            aJob.Location.State = _lookUpService.MapLookUp3Col(reader, ref startIndex);
            aJob.Location.DateCreated = reader.GetSafeDateTime(startIndex++);
            aJob.Location.DateModified = reader.GetSafeDateTime(startIndex++);
            aJob.RemoteStatus = _lookUpService.MapSingleLookUp(reader, ref startIndex);
            aJob.ContactName = reader.GetSafeString(startIndex++);
            aJob.ContactPhone = reader.GetSafeString(startIndex++);
            aJob.ContactEmail = reader.GetSafeString(startIndex++);
            aJob.EstimatedStartDate = reader.GetSafeDateTime(startIndex++);
            aJob.EstimatedFinishDate = reader.GetSafeDateTime(startIndex++);
            aJob.DateCreated = reader.GetSafeDateTime(startIndex++);
            aJob.DateModified = reader.GetSafeDateTime(startIndex++);
            aJob.CreatedBy = reader.GetSafeInt32(startIndex++);
            aJob.ModifiedBy = reader.GetSafeInt32(startIndex++);

            jobCompensation.Job = aJob;
            jobCompensationPackage.Id = reader.GetSafeInt32(startIndex++);
            jobCompensationPackage.Name = reader.GetSafeString(startIndex++);
            jobCompensationPackage.OrgId = reader.GetSafeInt32(startIndex++);
            jobCompensationPackage.OrgName = reader.GetSafeString(startIndex++);
            jobCompensationPackage.CreatedBy = reader.GetSafeInt32(startIndex++);
            jobCompensationPackage.ModifiedBy = reader.GetSafeInt32(startIndex++);
            jobCompensationPackage.IsDeleted = reader.GetSafeBool(startIndex++);
            jobCompensationPackage.DateCreated = reader.GetSafeDateTime(startIndex++);
            jobCompensationPackage.DateModified = reader.GetSafeDateTime(startIndex++);
            jobCompensationPackage.Description = reader.GetSafeString(startIndex++);

            jobCompensation.JobCompensationPackage = jobCompensationPackage;
            jobCompensation.CreatedBy = reader.GetSafeInt32(startIndex++);
            jobCompensation.ModifiedBy = reader.GetSafeInt32(startIndex++);
            jobCompensation.DateCreated = reader.GetSafeDateTime(startIndex++);
            jobCompensation.DateModified = reader.GetSafeDateTime(startIndex++);

            return jobCompensation;
        }

        public void AddJobCompensation(JobCompensationAddRequest request, int currentUserId)
        {
            const string procName = "[dbo].[JobCompensations_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddJobCompensationParams(request, col, currentUserId);
                    col.AddWithValue("@CreatedBy", currentUserId);

                },
                returnParameters: null);

        }

        public void UpdateJobCompensation(JobCompensationUpdateRequest request, int jobId, int compId, int userId)
        {


            string procName = "[dbo].[JobCompensations_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {

                    AddJobCompensationParams(request, col, userId);
                    col.AddWithValue("@OldJobId", jobId);
                    col.AddWithValue("@OldCompId", compId);

                },
                returnParameters: null);

        }

        public void JobsCompensationDelete(int JobId, int CompId)
        {
            string procName = "[dbo].[JobCompensations_Delete]";
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@JobId", JobId);
                col.AddWithValue("@CompId", CompId);
            },
         returnParameters: null);
        }
        private static void AddJobCompensationParams(JobCompensationAddRequest request, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@JobId", request.JobId);
            col.AddWithValue("@CompensationPackageId", request.CompensationPackageId);

            col.AddWithValue("@ModifiedBy", userId);
        }

        #endregion

        #region Configuration
        public CompensationTypeLabel Get(int id)
        {
            const string procName = "[dbo].[CompensationTypeLabels_SelectById]";

            CompensationTypeLabel compensationType = null;

            _data.ExecuteCmd(
                procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                },
                delegate (IDataReader dReader, short set)
                {
                    int startIndex = 0;
                    compensationType = MapSingleCompensationTypeLabel(dReader, ref startIndex);

                },
                returnParameters: null
            );

            return compensationType;

        }

        public List<CompensationTypeLabel> GetAllFiltered()
        {
            const string procName = "[dbo].[CompensationTypeLabels_SelectAll_LabelFiltered]";
            List<CompensationTypeLabel> compensationTypeLabels = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader dReader, short set)
                {

                    int startIndex = 0;
                    CompensationTypeLabel compensationType = MapSingleCompensationTypeLabel(dReader, ref startIndex);

                    if (compensationTypeLabels == null)
                    {
                        compensationTypeLabels = new List<CompensationTypeLabel>();
                    }
                    compensationTypeLabels.Add(compensationType);

                }
            );

            return compensationTypeLabels;
        }

        public List<CompensationTypeLabel> GetAllUnfiltered()
        {
            const string procName = "[dbo].[CompensationTypeLabels_SelectAll_LabelUnfiltered]";
            List<CompensationTypeLabel> compensationTypeLabels = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader dReader, short set)
                {
                    int startIndex = 0;
                    CompensationTypeLabel compensationType = MapSingleCompensationTypeLabel(dReader, ref startIndex);

                    if (compensationTypeLabels == null)
                    {
                        compensationTypeLabels = new List<CompensationTypeLabel>();
                    }
                    compensationTypeLabels.Add(compensationType);

                }
            );

            return compensationTypeLabels;
        }

        private static CompensationTypeLabel MapSingleCompensationTypeLabel(IDataReader reader, ref int startIndex)
        {
            CompensationTypeLabel compensationTypeLabel = new CompensationTypeLabel();
            compensationTypeLabel.CompensationType = _lookUpService.MapSingleLookUp(reader, ref startIndex);
            compensationTypeLabel.CompensationLabels = reader.DeserializeObject<List<LookUp3Col>>(startIndex++);

            return compensationTypeLabel;
        }


        public void Post(CompensationTypeAddDeleteRequest model)
        {
            const string procName = "[dbo].[CompensationTypeLabels_Insert]";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    AddCommonParams(model, parameterCollection);
                },
                returnParameters: null
            );
        }

        public void Delete(CompensationTypeAddDeleteRequest model)
        {
            const string procName = "[dbo].[CompensationTypeLabels_DeleteById]";

            _data.ExecuteNonQuery(
                procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    AddCommonParams(model, parameterCollection);
                },
                returnParameters: null
            );
        }

        public void DeleteByTypeId(int typeId)
        {
            const string procName = "[dbo].[CompensationTypeLabels_DeleteByTypeId]";

            _data.ExecuteNonQuery(
                procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@TypeId", typeId);
                },
                returnParameters: null
            );

        }


        public void Update(CompensationTypeAddDeleteRequest model)
        {
            const string procName = "[dbo].[CompensationTypeLabels_Update]";

            _data.ExecuteNonQuery(
                procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    AddCommonParams(model, parameterCollection);
                },
                returnParameters: null
            );

        }

        private static void AddCommonParams(CompensationTypeAddDeleteRequest paramModel, SqlParameterCollection paramCol)
        {
            paramCol.AddWithValue("@CompensationTypeId", paramModel.CompensationTypeId);
            paramCol.AddWithValue("@LabelId", paramModel.LabelId);

        }

        #endregion


    }
}
