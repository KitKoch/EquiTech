using System;

namespace Models.Domain.OrganizationMembers
{
    public class OrganizationMemberV2
    {
        public int Id { get; set; }
        public MembersOrganizationBase Organization { get; set; }
        public LookUp OrganizationType { get; set; }
        public Member User { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
