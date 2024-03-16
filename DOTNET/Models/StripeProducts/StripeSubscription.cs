using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.StripeProducts
{
    public class StripeSubscription
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public string SubscriptionId { get; set; }
        public StripeProduct Product { get; set; }
        public BaseUser User { get; set; }
        public string CustomerId { get; set; }
        public bool Status { get; set; }
        public DateTime DateCreated { get; set; }

    }
}
