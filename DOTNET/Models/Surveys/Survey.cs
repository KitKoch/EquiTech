using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Surveys
{
    public class Survey : BaseSurvey
    {
        public string Description { get; set; }

        public LookUp SurveyStatus { get; set; }

        public LookUp SurveyTypes { get; set; }

        public BaseUser CreatedBy { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}
