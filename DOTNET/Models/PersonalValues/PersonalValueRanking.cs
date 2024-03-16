using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.PersonalValueRankings
{
    public class PersonalValueRanking : LookUp
    {
        public int Rank { get; set; }
        public int Sort { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
