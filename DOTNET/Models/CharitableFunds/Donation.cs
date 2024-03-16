using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.CharitableFunds
{
    public class Donation
    {
        public int Id { get; set; }
        public BaseCharitableFund CharitableFund { get; set; }
        public string OrderId { get; set; }
        public int UnitCost { get; set; }
        public BaseUser CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
