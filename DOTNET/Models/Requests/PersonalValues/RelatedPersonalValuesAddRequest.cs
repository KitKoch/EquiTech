using Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.PersonalValues
{
    public class RelatedPersonalValuesAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int PersonalValueA { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int PersonalValueB { get; set; }
    }
}
