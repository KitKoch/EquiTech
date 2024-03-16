using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.PersonalValueRankings
{
    public class PersonalValueRankings
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int PersonalValueId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Rank { get; set; }
    }
}
