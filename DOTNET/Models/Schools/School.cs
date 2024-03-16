using Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Schools
{
    public class School
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public BaseLocation Location { get; set; }
        public string LogoUrl { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsVerified { get; set; }
        public BaseUser CreatedBy { get; set; }
        public BaseUser ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
