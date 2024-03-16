using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Locations;

namespace Models.Domain.Organizations
{
    public class OrganizationLocations
    {
        public int OrganizationId { get; set; }
        public List<LookUp> OrganizationType { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string Phone { get; set; }
        public Uri SiteUrl { get; set; }
        public bool IsValidated { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int JobCount { get; set; }
        public List<Location> Location { get; set; }
    }
}
