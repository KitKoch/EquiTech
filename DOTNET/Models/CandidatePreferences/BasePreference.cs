using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.CandidatePreferences
{
    public class BasePreference
    {
        public int Id { get; set; }
        public decimal MinimumPay { get; set; }
        public decimal DesiredPay { get; set; }
        public bool IsHourly { get; set; }
    }
}
