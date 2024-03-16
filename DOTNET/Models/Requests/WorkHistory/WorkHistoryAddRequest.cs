using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.WorkHistory
{
    public class WorkHistoryAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string CompanyName { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string CompanyContact { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string CompanyEmail { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 2)]
        public string CompanyPhone { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int LocationId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int IndustryId { get; set; }

        [Required]
        public DateTime? StartDate { get; set; }

        [AllowNull]
        public DateTime? EndDate { get; set; }

    }
}
