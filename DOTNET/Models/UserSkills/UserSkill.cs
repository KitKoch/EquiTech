using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.UserSkills
{
    public class UserSkill
    {
        public LookUp3Col User { get; set; }
        public LookUp Skill { get; set; }
        public LookUp Industry { get; set; }
        public LookUp3Col Experience { get; set; }
        public int Years { get; set; }
        public int Months { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
