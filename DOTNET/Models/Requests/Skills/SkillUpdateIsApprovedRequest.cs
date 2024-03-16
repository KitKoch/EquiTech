using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Skills
{
    public class SkillUpdateIsApprovedRequest : IModelIdentifier
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public bool IsApproved { get; set; }
    }
}
