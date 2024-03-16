using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.CandidateLocationsRequest
{
    public class CandidateLocationsFormUpdateRequest : CandidateLocationsFormAddRequest, IModelIdentifier
    {

        public int Id { get; set; }
    }
}
