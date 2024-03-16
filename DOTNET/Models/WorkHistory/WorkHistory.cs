using Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.WorkHistory
{
    public class WorkHistory
    {
        public int Id { get; set; }

        public string CompanyName { get; set; }

        public string CompanyContact { get; set; }

        public string CompanyEmail { get; set; }

        public string CompanyPhone { get; set; }

        public int LocationId { get; set; }

        public LocationAddress Location { get; set; }

        public int UserId { get; set; }

        public LookUp Industry { get; set; }

        public List<WorkPosition> WorkPositions { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

    }
}
