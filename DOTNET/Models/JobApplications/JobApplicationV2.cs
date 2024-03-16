using Models.Domain.Jobs;
using Models.Domain.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Organizations;

namespace Models.Domain.JobApplications
{
    public class JobApplicationV2
    {
        public int Id { get; set; }
        public BaseJobV2 Job { get; set; }
        public LookUp Status { get; set; }
        public Boolean IsWithdrawn { get; set; }
        public BaseUser CreatedBy { get; set; }
        public string Email { get; set; }
        public int PendingStatusCount { get; set; }
        public int AcceptedStatusCount { get; set; }
        public int NegotiationStatusCount { get; set; }
        public int OfferedStatusCount { get; set; }
        public int EmployedStatusCount { get; set; }
        public int RejectedStatusCount { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
