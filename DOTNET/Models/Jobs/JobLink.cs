using Models.Domain.Locations;
using Models.Domain.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Jobs
{
    public class JobLink

    {
        public int Id { get; set; }
        public string UniqueCode { get; set; }
        public int TouchCounter { get; set; }
        public int CompleteCounter { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public Job Job { get; set; }
    }
}
