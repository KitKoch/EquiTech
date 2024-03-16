using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Teams
{
    public class TeamMembersAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int UserId { get; set; }


        [Required]
        [Range(1, int.MaxValue)]
        public int TeamId { get; set; }

    }
}
