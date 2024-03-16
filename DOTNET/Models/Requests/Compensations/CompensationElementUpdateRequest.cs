using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Compensations
{
    public class CompensationElementUpdateRequest : CompensationElementAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
