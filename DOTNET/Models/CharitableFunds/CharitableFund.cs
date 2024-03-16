using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.CharitableFunds
{
    public class CharitableFund : BaseCharitableFund
    {
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsDeleted { get; set; }
        public BaseUser CreatedBy { get; set; }
    }
}
