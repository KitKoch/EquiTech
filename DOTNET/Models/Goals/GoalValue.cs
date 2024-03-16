using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Goals
{
    public class GoalValue
    {
        public int GoalId { get; set; }
        public int PersonalValueId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
