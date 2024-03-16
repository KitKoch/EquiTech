using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SurveyAnswers
{
    public class SurveyAnswer : BaseSurveyAnswer
    {
        public int InstanceId { get; set; }
        public int QuestionId { get; set; }
        public int AnswerOptionId { get; set; }
        public bool AnswerNumber { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
