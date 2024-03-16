using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.InviteMembers
{
    public class InviteMembersAddRequest
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(2), MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [MinLength(3), MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [Range(2, 4)]
        public int UserRoleTypeId { get; set; }
        //[Required] //Once OrganizationId is added to the CurrentUser object this will be Required
        [AllowNull]
        public int OrganizationId { get; set; }
    }
}
