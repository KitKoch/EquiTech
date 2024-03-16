using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SiteReferences
{
    public class SiteReference
    {
        public LookUp ReferenceType { get; set; }
        public int UserId { get; set; }
    }
}