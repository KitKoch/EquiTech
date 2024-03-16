using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Stripe
{
    public class SubscriptionAddRequest
    {
        [Required]
        [StringLength(150, MinimumLength = 5)]
        public string SessionId { get; set; }

    }
}
