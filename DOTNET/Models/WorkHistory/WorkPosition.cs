using Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.WorkHistory
{
    public class WorkPosition
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int WorkHistoryId { get; set; }

        public LookUp WageType { get; set; }

        public LookUp JobType { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

    }
}
