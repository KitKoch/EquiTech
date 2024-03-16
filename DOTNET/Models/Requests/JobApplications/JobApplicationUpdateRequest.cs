using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.JobApplications
{
    public class JobApplicationUpdateRequest : IModelIdentifier
    {
        [Required(ErrorMessage = "Id is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Id greater than 0 is required")]
        public int Id { get; set; }

        [Required(ErrorMessage = "A ResumeFileId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A ResumeFileId greater than 0 is required")]
        public int ResumeFileId { get; set; }
    }
}
