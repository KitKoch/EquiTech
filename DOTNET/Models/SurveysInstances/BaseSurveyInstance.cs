using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.SurveysInstances
{
	public class BaseSurveyInstance
	{
		public int Id { get; set; }
		public int SurveyId { get; set; }
		public BaseUser Creator { get; set; }
		public string Email { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateModified { get; set; }
	}
}
