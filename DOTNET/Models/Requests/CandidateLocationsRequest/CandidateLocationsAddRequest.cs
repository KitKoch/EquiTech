using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.CandidateLocationsRequest
{
	public class CandidateLocationsAddRequest
	{
		[Required]
		[Range(1, int.MaxValue)]
		public int LocationId { get; set; }

		[Required]
		[Range(1, int.MaxValue)]
		public int PreferenceId { get; set; }

		[Required]
		[Range(1, int.MaxValue)]
		public int SortOrder { get; set; }

		[Required]
		public bool IsNegotiable { get; set; }
	}
}
