using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.JobApplications
{
    public class JobApplicationAddRequest
    {
        [Required(ErrorMessage = "A JobId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A JobId greater than 0 is required")]
        public int JobId { get; set; }

        [Required(ErrorMessage = "A ResumeFileId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A ResumeFileId greater than 0 is required")]
        public int ResumeFileId { get; set; }

        [Required(ErrorMessage = "IsWithdrawn is required")]
        public Boolean IsWithdrawn { get; set; }
    }
}
