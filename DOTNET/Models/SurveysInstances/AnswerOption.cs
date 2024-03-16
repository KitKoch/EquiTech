using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SurveysInstances
{
    public class AnswerOption
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AdditionalInfo { get; set; }
        public int Value { get; set; }
        public int PersonalValueId { get; set; }
        public string PersonalValueName { get; set; }
    }
}
