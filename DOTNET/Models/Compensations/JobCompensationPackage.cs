using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Compensations
{
    public class JobCompensationPackage
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int OrgId { get; set; }
        public string OrgName { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string Description { get; set; }
    }
}
