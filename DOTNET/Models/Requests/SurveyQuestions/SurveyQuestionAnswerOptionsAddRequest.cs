using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.SurveyQuestions
{
    public class SurveyQuestionAnswerOptionsAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int QuestionId { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string Text { get; set; }

        [StringLength(100, MinimumLength = 2)]
        public string Value { get; set; }

        [StringLength(200, MinimumLength = 2)]
        public string AdditionalInfo { get; set; }

        [Range(1, int.MaxValue)]
        public int PersonalValueId { get; set; }
    }
}
