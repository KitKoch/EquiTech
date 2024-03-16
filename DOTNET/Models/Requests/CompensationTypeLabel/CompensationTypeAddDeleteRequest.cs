using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.CompensationType
{
    public class CompensationTypeAddDeleteRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int CompensationTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int LabelId { get; set; }
    }
}
