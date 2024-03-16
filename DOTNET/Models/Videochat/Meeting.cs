using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Videochat
{
    public class Meeting
    {
        public string Id { get; set; }
        public string Room { get; set; }
        public long Start_Time { get; set; }
        public int Duration { get; set; }
        public Boolean Ongoing { get; set; }
        public int Max_Participants { get; set; }
    }
}
