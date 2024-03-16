using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Videochat
{
    public class Statistics
    {
        public int Id { get; set; }
        public int HostId { get; set; }
        public string DailyId { get; set; }
        public string RoomName { get; set; }
        public int Duration { get; set; }
        public DateTime StartTime { get; set; }
        public int ParticipantId { get; set; }
    }
}
