using Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.FAQ
{
    public class FAQAddRequest
    {
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Question { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 2)]
        public string Answer { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int SortOrder { get; set; }
    }
}
