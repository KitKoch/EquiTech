using Models.Domain.Files;
using Models.Domain.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.JobApplications
{
    public class JobApplication
    {
        public int Id { get; set; }
        public BaseJob Job { get; set; }
        public File ResumeFile { get; set; }
        public LookUp Status { get; set; }
        public Boolean IsWithdrawn { get; set; }
        public BaseUser CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
