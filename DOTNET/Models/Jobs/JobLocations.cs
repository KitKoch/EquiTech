using Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Jobs
{
    public class JobLocations
    {
        public int JobId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Requirements { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public DateTime EstimatedStartDate { get; set; }
        public DateTime EstimatedFinishDate { get; set; }
        public DateTime DateCreated { get; set; }
        public List<Location> Locations { get; set; }

    }
}
