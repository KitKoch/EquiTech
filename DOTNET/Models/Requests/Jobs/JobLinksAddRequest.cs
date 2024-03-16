using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Jobs
{
    public class JobLinksAddRequest
    {
        [Required]
        [StringLength(64, MinimumLength = 2)]
        public string UniqueCode { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int JobId { get; set; }

    }
}
