using Models.Domain.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Jobs
{
    public class BaseJobV2 : BaseJob
    {
        public string Description { get; set; }
        public string Requirements { get; set; }
        public BaseOrganization Organization { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public DateTime EstimatedStartDate { get; set; }
        public DateTime EstimatedFinishDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }

    }
}
