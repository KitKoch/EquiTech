using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Models.Requests.Compensations
{
    public class CompensationPackageAddRequest
    {
        [Required]
        [Range(1, 1000)]
        public int OrgId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

    }
}
