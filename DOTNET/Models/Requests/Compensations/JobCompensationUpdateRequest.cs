using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Compensations
{
    public class JobCompensationUpdateRequest : JobCompensationAddRequest
    {

        [Required]
        [Range(1, 1000)]
        int OldCompId { get; set; }
        [Required]
        [Range(1, 1000)]
        int OldJobId { get; set; }



    }
}
