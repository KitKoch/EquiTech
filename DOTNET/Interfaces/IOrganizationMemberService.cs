using Models;
using Models.Domain.OrganizationMembers;
using Models.Requests.InviteMembers;
using Models.Requests.OrganizationMembersRequest;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IOrganizationMemberService
    {
        int AddOrgMember(OrganizationMemberAddRequest model);
        Paged<OrganizationMemberV2> ByOrgByNameByEmail(int pageIndex, int pageSize, string query);
        Paged<OrganizationMemberV2> ByOrgId(int pageIndex, int pageSize, int query);
        void Delete(int id);
        OrganizationMember GetOrgMember(int id);
        void UpdateOrgMember(OrganizationMemberUpdateRequest model);
        Dictionary<string, int> InviteOrgMember(InviteMembersAddRequest model, int userId, int orgId);
    }
}