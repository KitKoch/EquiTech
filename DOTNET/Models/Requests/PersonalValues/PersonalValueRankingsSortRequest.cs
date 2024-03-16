using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.PersonalValueRankings
{
    public class PersonalValueRankingsSortRequest : PersonalValueRankings
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Sort { get; set; }
    }
}
