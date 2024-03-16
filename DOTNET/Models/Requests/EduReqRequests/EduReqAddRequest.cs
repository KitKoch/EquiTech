using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.EduReqRequests
{
    public class EduReqAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string Description { get; set; }
        [Required]
        [Range(1, 10000)]
        public int EducationLevelId { get; set; }
        [Required]
        [Range(1, 10000)]
        public int DegreeId { get; set; }
        [Required]
        [Range(1, 10000)]
        public int OrganizationId { get; set; }
        [Required]
        public bool IsExperienceAllowed { get; set; }
        [Required]
        [Range(1, 50)]
        public int MinYears { get; set; }
    }
}
