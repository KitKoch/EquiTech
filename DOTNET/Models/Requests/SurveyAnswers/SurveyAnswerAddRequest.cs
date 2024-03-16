using Google.Apis.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.SurveyAnswers
{
    public class SurveyAnswerAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int InstanceId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int QuestionId { get; set; }

        [AllowNull]
        [Range(1, int.MaxValue)]
        public int? AnswerOptionId { get; set; }

        [AllowNull]
        [StringLength(500, MinimumLength = 2)]
        public string Answer { get; set; }

        [AllowNull]
        public bool? AnswerNumber { get; set; }
    }
}
