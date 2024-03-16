using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Appointments
{
    public class AppointmentAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int AppointmentTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int ClientId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int TeamMemberId { get; set; }

        [AllowNull]
        public string Notes { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int LocationId { get; set; }

        [Required]
        public bool IsConfirmed { get; set; }

        [Required]
        public DateTime AppointmentStart { get; set; }

        [Required]
        public DateTime AppointmentEnd { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int StatusTypesId { get; set; }

    }
}
