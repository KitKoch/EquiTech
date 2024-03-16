using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.CompensationTypeLabels
{
    public class CompensationTypeLabel
    {

        public LookUp CompensationType { get; set; }
        public List<LookUp3Col> CompensationLabels { get; set; }

    }
}
