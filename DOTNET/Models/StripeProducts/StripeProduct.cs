using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.StripeProducts
{
    public class StripeProduct
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string PriceId { get; set; }
        public double Amount { get; set; }
        public string Name { get; set; }
    }
}
