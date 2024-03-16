using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Schools
{
    public class SchoolUpdateRequest
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id is required and must be positive number")]
        public int Id { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Name is Required")]
        public string Name { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "LocationId is required and must be positive number")]
        public int LocationId { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Logo URL is Required")]
        public string LogoUrl { get; set; }
    }
}
