using Models.Domain.SurveyAnswers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SurveysInstances
{
    public class InstanceSurveyQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public int QuestionTypeId { get; set; }
        public string QuestionTypeName { get; set; }
        public List<AnswerOption> AnswerOptions { get; set; }
        public List<BaseSurveyAnswer> Answers { get; set; }
    }
}
