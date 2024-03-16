using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.InviteMembers
{
    public class InviteMember
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public LookUp UserRoleTypeId { get; set; }
        public LookUp3Col OrganizationId { get; set; }
        public DateTime ExpirationDate { get; set; }
        public BaseUser CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
