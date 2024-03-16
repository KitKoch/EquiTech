using Models.Domain.Locations;
using Models.Domain.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Jobs
{
    public class BaseJob
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public LookUp Type { get; set; }
        public LookUp JobStatus { get; set; }
        public LookUp RemoteStatus { get; set; }
    }
}
