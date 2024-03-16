using Models;
using Models.Domain;
using Models.Domain.Jobs;
using Models.Requests.Jobs;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IJobService
    {
        Job GetById(int id);
        int Add(JobAddRequest model, int userId);
        void Update(JobUpdateRequest model, int userId);
        void UpdateJobStatus(JobUpdateStatusRequest model);
        Paged<Job> GetOrgIdPaginated(int pageIndex, int pageSize, int organizationId);
        void DeleteJobLoc(int jobId, int locationId);
        JobLocations GetJobLoc(int jobId);
        Paged<Job> GetJobLocPage(int pageIndex, int pageSize, int locationId);
        void AddJobLoc(JobLocAddRequest model, int userId);
        Paged<Job> GetAllPaginated(int pageIndex, int pageSize);
        Paged<Job> SearchPaginated(int pageIndex, int pageSize, string query);
        Paged<Job> GetByLocation(int pageIndex, int pageSize, double latitude, double longitude, int radius);
        int AddJobLink(JobLinksAddRequest model, int userId);
        JobLink GetJobLinkById(int id);
        JobLink GetJobLinkByCode(string code);
        Paged<JobLink> GetJobLinkByOrgId(int pageIndex, int pageSize, int orgId);
        void UpdateJobLinkIsActive(JobLinksUpdateRequest model, int userId);
        void UpdateJobLinkIsDeleted(JobLinksUpdateRequest model, int userId);
        void UpdateJobLinkTouchCounter(JobLinksUpdateRequest model, int userId);
        void UpdateJobLinkCompleteCounter(JobLinksUpdateRequest model, int userId);
    }
}

