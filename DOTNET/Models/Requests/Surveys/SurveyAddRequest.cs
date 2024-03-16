using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Surveys
{
    public class SurveyAddRequest
    {
        [Required(ErrorMessage = "Name is Required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be longer than 2 characters and not exceed 100.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "A Description is Required.")]
        [StringLength(2000, MinimumLength = 15, ErrorMessage = "Description must be longer than 10 characters and not exceed 2000.")]
        public string Description { get; set; }

        public int StatusId { get; set; }

        public int UserId { get; set; }
    }
}
