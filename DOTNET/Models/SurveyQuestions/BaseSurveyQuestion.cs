using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SurveyQuestions
{
    public class BaseSurveyQuestion
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Question { get; set; }
        public string HelpText { get; set; }
        public bool IsRequired { get; set; }
        public bool isMultipleAllowed { get; set; }
        public LookUp QuestionType { get; set; }
        public int SurveyId { get; set; }
        public LookUp StatusType { get; set; }
        public int SortOrder { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
