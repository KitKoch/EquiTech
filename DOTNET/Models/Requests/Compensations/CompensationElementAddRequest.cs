using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Compensations
{
    public class CompensationElementAddRequest
    {
        [Required]
        [Range(1, 1000)]
        public int CompensationPackageId { get; set; }
        [Required]
        [Range(1, 1000)]
        public int CompensationTypeId { get; set; }
        [Required]
        [Range(1, 1000)]
        public int CompensationLabelId { get; set; }
        [Required]
        [Range(1, 1000000)]
        public int NumericValue { get; set; }

    }
}
