using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Skills
{
    public class BaseSkill
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public LookUp Industry { get; set; }
    }
}
