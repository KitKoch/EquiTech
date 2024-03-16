using Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.CandidateLocations
{
    public class CandidateLocation
    {
        public BaseUser User { get; set; }
        public Location Location { get; set; }
        public int PreferenceId { get; set; }
        public int SortOrder { get; set; }
        public bool IsNegotiable { get; set; }
    }
}
