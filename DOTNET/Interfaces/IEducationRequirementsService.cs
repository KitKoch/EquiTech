using Models;
using Models.Domain.EducationRequirements;
using Models.Requests.EduReqRequests;
using System.Collections.Generic;
using System.Net;

namespace Services.Interfaces
{
    public interface IEducationRequirementsService
    {
        Paged<JobEduReq> GetByEduReqId(int id, int pageIndex, int pageSize);
        Paged<JobEduReq> GetByOrgId(int id, int pageIndex, int pageSize);
        List<JobEduReq> GetByJobId(int id);
        EducationRequirement GetById(int id);
        List<EducationRequirement> GetAll();
        int Add(EduReqAddRequest model, int currentUserId);
        int AddJobEduReq(EduReqRequest model, int currentUserId);
        void Update(EduReqUpdateRequest model, int currentUserId);
        void UpdateJobEduReq(EduReqRequest model);
        void DeleteJobEduReq(int id);
        void UpdateIsDeleted(int id, int currentUserId);
    }
}