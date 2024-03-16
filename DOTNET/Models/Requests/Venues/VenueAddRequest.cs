using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Venues
{
    public class VenueAddRequest
    {
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(Int32.MaxValue, MinimumLength = 5)]
        public string Description { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int LocationId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 5)]
        public string Url { get; set; }

    }
}
