using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Jobs
{
    public class JobUpdateStatusRequest : IModelIdentifier
    {
        public int Id { get; set; }
    }
}
