using Models;
using Models.Domain.Compensations;
using Models.Domain.CompensationTypeLabels;
using Models.Requests.Compensations;
using Models.Requests.CompensationType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ICompensationService
    {
        #region Elements
        CompensationElement SelectByElementId(int id);
        List<CompensationElement> SelectByCompPackageId(int compPackageId);
        int AddElement(CompensationElementAddRequest request);
        void UpdateElement(CompensationElementUpdateRequest updateRequest);
        void DeleteElement(int id);
        void BatchElementInsert(List<CompensationElementAddRequest> models, int userId);
        void DeleteElementsByPackageId(int id);
        #endregion

        #region Packages
        CompensationPackage SelectByPackageId(int id);
        Paged<CompensationPackage> SelectByOrgIdPaged(int pageIndex, int pageSize, int orgId);
        int AddPackage(CompensationPackageAddRequest request, int userId);
        void UpdatePackage(CompensationPackageUpdateRequest updateRequest, int currentUserId);
        void SoftDelete(int id);
        void DeletePackage(int id);
        #endregion

        #region Compensation
        List<JobCompensation> SelectByJobId(int JobId);
        JobCompensation SelectByJobandCompId(int JobId, int CompId);
        void AddJobCompensation(JobCompensationAddRequest request, int currentUserId);
        void UpdateJobCompensation(JobCompensationUpdateRequest request, int jobId, int compId, int userId);
        void JobsCompensationDelete(int JobId, int CompId);
        #endregion

        #region Configuration
        CompensationTypeLabel Get(int id);
        List<CompensationTypeLabel> GetAllFiltered();
        List<CompensationTypeLabel> GetAllUnfiltered();
        void Post(CompensationTypeAddDeleteRequest model);
        void Delete(CompensationTypeAddDeleteRequest model);
        void DeleteByTypeId(int typeId);
        void Update(CompensationTypeAddDeleteRequest model);
        #endregion


    }
}
