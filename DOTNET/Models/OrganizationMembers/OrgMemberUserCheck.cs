using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Users;

namespace Models.Domain.OrganizationMembers
{
    public class OrgMemberUserCheck : BaseUser
    {
#nullable enable
        public int? OrganizationId { get; set; }
        public string? InviteEmail { get; set; }
#nullable disable
    }
}