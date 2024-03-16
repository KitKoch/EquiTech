using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Videochat
{
    public class MeetingParticipantsAddRequest
    {
        [Required(ErrorMessage = "A DailyMeetingId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A DailyMeetingId greater than 0 is required")]
        public int DailyMeetingId { get; set; }
        [Required(ErrorMessage = "A UserId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A UserId greater than 0 is required")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "A Duration is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A Duration greater than 0 is required")]
        public int Duration { get; set; }
    }
}
