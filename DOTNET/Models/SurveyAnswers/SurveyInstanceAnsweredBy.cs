using System;


namespace Models.Domain.SurveyAnswers
{
    public class SurveyInstanceAnsweredBy
    {
        public int SurveyAnswerId { get; set; }
        public int SurveyId { get; set; }
        public string SurveyName { get; set; }
        public LookUp SurveyStatus { get; set; }
        public LookUp SurveyType { get; set; }
        public int InstanceId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser SurveyTaker { get; set; }
    }
}
