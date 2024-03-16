using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.CandidatePreferencesRequest
{
    public class CandidatePreferencesAddRequest
    {
        [Required]
        [Range(1, double.MaxValue)]
        public decimal MinimumPay { get; set; }
        [Required]
        [Range(1, double.MaxValue)]
        public decimal DesiredPay { get; set; }
        [Required]
        public bool IsHourly { get; set; }
    }
}
