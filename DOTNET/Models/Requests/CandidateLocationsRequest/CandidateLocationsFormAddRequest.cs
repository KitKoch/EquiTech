using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Requests.Locations;

namespace Models.Requests.CandidateLocationsRequest
{
    public class CandidateLocationsFormAddRequest : LocationAddRequest
    {

        public int PreferenceId { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "A sort Order greter than 0 is required")]
        public int SortOrder { get; set; }

        [Required]
        public bool IsNegotiable { get; set; }
    }
}
