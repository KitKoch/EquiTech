using Models.Domain.Goals;
using Models.Requests.CandidatePreferencesRequest;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Goals
{
    public class GoalAddRequest : CandidatePreferencesAddRequest
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Statement { get; set; }
        [Required]
        public int Priority { get; set; }
        [Required]
        [Range(1, 10)]
        public int YearsToGoal { get; set; }
        [Required]
        public List<int> GoalValues { get; set; }

    }
}
