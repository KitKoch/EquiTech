using Models.Domain.CandidatePreferences;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Goals
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Statement { get; set; }
        public BasePreference PaymentPreference { get; set; }
        public int Priority { get; set; }
        public int YearsToGoal { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsDeleted { get; set; }
        public BaseUser CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public List<LookUp> GoalValues { get; set; }

    }
}
