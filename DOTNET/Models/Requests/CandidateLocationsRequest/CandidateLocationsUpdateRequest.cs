using Models.Requests.CandidateLocationsRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Models.Requests.CandidateLocationsRequest
{
    public class CandidateLocationsUpdateRequest : CandidateLocationsAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }

    }
}
