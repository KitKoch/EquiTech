using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Videochat
{
    public class StatisticsAddRequest
    {
        [Range(0, int.MaxValue)]
        [Required(ErrorMessage = "A HostId is required")]
        public int HostId { get; set; }

        [Required(ErrorMessage = "A DailyId is required")]
        public string DailyId { get; set; }

        [Required(ErrorMessage = "A RoomName is required")]
        public string RoomName { get; set; }

        [Required(ErrorMessage = "A Duration is required")]
        public int Duration { get; set; }
    }
}
