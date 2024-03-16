using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Teams
{
    public class TeamAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int OrganizationId { get; set; }


        [Required]
        [StringLength(100)]
        public string Name { get; set; }


        [Required]
        [StringLength(500)]
        public string Description { get; set; }


    }
}
