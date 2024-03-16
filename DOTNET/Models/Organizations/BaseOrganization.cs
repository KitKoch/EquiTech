using Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Organizations
{
    public class BaseOrganization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string Phone { get; set; }
        public string SiteUrl { get; set; }
    }
}

