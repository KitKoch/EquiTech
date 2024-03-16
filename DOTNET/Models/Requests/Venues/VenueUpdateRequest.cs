using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Venues
{
    public class VenueUpdateRequest : VenueAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
