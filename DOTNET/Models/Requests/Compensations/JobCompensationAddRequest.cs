using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Compensations
{
    public class JobCompensationAddRequest
    {
        [Required]
        [Range(1, 1000)]
        public int JobId { get; set; }

        [Required]
        [Range(1, 1000)]
        public int CompensationPackageId { get; set; }
    }
}
