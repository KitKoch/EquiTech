using Models;
using Models.Domain.JobApplications;
using Models.Requests.JobApplications;

namespace Services.Interfaces
{
    public interface IJobApplicationsService
    {
        int Add(JobApplicationAddRequest jobApplication, int userId);
        void Update(JobApplicationUpdateRequest jobApplication);
        JobApplication Get(int id);
        void UpdateIsWithdrawn(int jobId);
        void UpdateStatus(JobApplicationUpdateStatusRequest jobStatus);
        void Delete(int id);
        Paged<JobApplication> GetPaginatedByCreatedBy(int pageIndex, int pageSize, int CreatedBy);
        public Paged<JobApplication> GetPaginatedByJobId(int pageIndex, int pageSize, int JobId);
        Paged<JobApplicationV2> GetPaginatedByOrgId(int pageIndex, int pageSize, int organizationId);
        Paged<JobApplicationV2> SearchJobApplicationsByOrgId(int pageIndex, int pageSize, int organizationId, string query);
    }
}