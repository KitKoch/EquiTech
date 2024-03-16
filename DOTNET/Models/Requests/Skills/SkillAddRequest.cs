using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Skills
{
    public class SkillAddRequest
    {

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; }

        [StringLength(500, MinimumLength = 2)]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int IndustryId { get; set; }

    }
}
