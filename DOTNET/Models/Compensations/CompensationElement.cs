using Models.Domain.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Compensations
{
    public class CompensationElement
    {
        public int CompElementId { get; set; }

        public Organization Organization { get; set; }

        public BaseUser User { get; set; }

        public bool IsDeleted { get; set; }

        public string Description { get; set; }

        public int NumericValue { get; set; }

        public LookUp CompensationType { get; set; }

        public LookUp CompensationLabel { get; set; }

        public LookUp CompensationPackage { get; set; }

    }
}
