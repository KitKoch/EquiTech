using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.WorkHistory
{
    public class WorkPositionAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [AllowNull]
        [StringLength(500, MinimumLength = 2)]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int WorkHistoryId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int WageTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int JobTypeId { get; set; }
    }
}
