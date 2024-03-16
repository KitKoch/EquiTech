using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class JobSkillsAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int JobId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int SkillId { get; set; }

        [Required]
        public int ExperienceLevelId { get; set; }

        [AllowNull]
        public int YearsRangeStart { get; set; }

        [AllowNull]
        public int YearsRangeEnd { get; set; }


    }
}
