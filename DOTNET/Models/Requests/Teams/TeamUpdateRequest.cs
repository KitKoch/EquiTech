using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Teams
{
    public class TeamUpdateRequest : TeamAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}
