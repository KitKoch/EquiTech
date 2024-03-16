using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Compensations
{
    public class CompensationPackage
    {
        public LookUp CompPackage { get; set; }

        public string Description { get; set; }

        public LookUp Organization { get; set; }

        public BaseUser User { get; set; }

        public bool IsDeleted { get; set; }

    }
}
