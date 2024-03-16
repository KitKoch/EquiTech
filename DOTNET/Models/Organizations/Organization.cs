using Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;


namespace Models.Domain.Organizations
{
    public class Organization : BaseOrganization
    {
        public LookUp OrganizationType { get; set; }
        public LocationAddress Location { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public bool IsValidated { get; set; }
    }
}

