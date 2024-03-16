using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SurveyQuestions
{
    public class SurveyQuestion : BaseSurveyQuestion
    {
        public List<SurveyQuestionAnswerOption> AnswerOptions { get; set; }
        public string SurveyName { get; set; }
    }
}
