using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class UserSkillsAddRequest
    {

        [Required]
        [Range(1, int.MaxValue)]
        public int SkillId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int ExperienceLevelId { get; set; }
        [Required]
        [Range(1, 50)]
        public int Years { get; set; }
        [Required]
        [Range(1, 50)]
        public int Months { get; set; }
    }
}
