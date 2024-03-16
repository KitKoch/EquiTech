using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.SurveyQuestions
{
    public class SurveyQuestionsAddRequest
    {

        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string Question { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string HelpText { get; set; }

        [Required]
        public bool IsRequired { get; set; }

        [Required]
        public bool isMultipleAllowed { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int QuestionTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int SurveyId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int StatusId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int SortOrder { get; set; }


    }
}
