using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests.Goals
{
    public class GoalUpdateRequest : GoalAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int PreferenceId { get; set; }
    }
}
