using Models.Domain.InviteMembers;
using Models.Requests.InviteMembers;

namespace Services.Interfaces
{
    public interface IInviteService
    {
        InviteMember SelectByToken(string token);
        int Add(InviteMembersAddRequest model, int userId);
        void DeleteInviteById(int id);
    }
}