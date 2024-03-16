using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.CharitableFunds
{
    public class DonationAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int CharitableFundId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string OrderId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int UnitCost { get; set; }
    }
}
