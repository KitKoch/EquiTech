using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Compensations
{
    public class CompensationPackageUpdateRequest : CompensationPackageAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
