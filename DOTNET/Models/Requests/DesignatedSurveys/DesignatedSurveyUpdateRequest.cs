using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.DesignatedSurveys
{
    public class DesignatedSurveyUpdateRequest : DesignatedSurveyAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
