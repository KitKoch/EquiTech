using System;
using System.Text;

namespace Models.Domain.SurveyQuestions
{
    public class SurveyQuestionAnswerOption
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public string AdditionalInfo { get; set; }
        public int PersonalValueId { get; set; }
        public int CreatedBy { get; set; }

    }
}
