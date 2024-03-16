using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Locations
{
    public class LocationAddRequest
    {
        [Required(ErrorMessage = "A LocationTypeId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A LocationTypeId greater than 0 is required")]
        public int LocationTypeId { get; set; }

        [Required(ErrorMessage = "A LineOne is required")]
        [MinLength(1, ErrorMessage = "Line One must have at least 1 character")]
        [MaxLength(255, ErrorMessage = "Line One must be less than 255 characters ")]
        public string LineOne { get; set; }

        public string LineTwo { get; set; }

        [Required(ErrorMessage = "A City is required")]
        [MinLength(1, ErrorMessage = "City must have at least 1 character")]
        [MaxLength(225, ErrorMessage = "City must be less than 255 characters ")]
        public string City { get; set; }

        [Required(ErrorMessage = "Zip is required")]
        [MinLength(1, ErrorMessage = "Zip must have at least 1 character")]
        [MaxLength(50, ErrorMessage = "Zip must be less than 255 characters ")]
        public string Zip { get; set; }

        [Required(ErrorMessage = "A StateId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A StateId greater than 0 is required")]
        public int StateId { get; set; }

        [Required(ErrorMessage = "The Latitude is required")]
        [Range(-90, 90, ErrorMessage = "A valid Latitude is required")]
        public double Latitude { get; set; }

        [Required(ErrorMessage = "The Longitude is required")]
        [Range(-180, 180, ErrorMessage = "A valid Longitude is required")]
        public double Longitude { get; set; }
    }
}
