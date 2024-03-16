using Google.Apis.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.EducationRequirements
{
    public class JobEduReq
    {
        public string Name { get; set; }
        public string JobTitle { get; set; }
        public int EducationRequirementId { get; set; }
        public int OrganizationId { get; set; }
        public int JobId { get; set; }
        public DateTime DateCreated { get; set; }
        public int CreatedBy { get; set; }
    }
}
