using Models.Domain.InviteMembers;
using Models.Domain.Emails;
using Models.Requests.ContactUs;
using Models.Requests.Emails;
using Models.Domain.OrganizationMembers;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IEmailSenderService
    {
        void ContactUsMessage(ContactUsEmailRequest model);
        void SmtpEmailMessage(SendEmailRequest email);
        void SendChangePasswordEmail(SendEmailRequest model, string token);
        void SendNewUserInviteEmail(InviteMember inviteModel);
        void SendExistingUserInviteEmail(List<OrganizationMemberV2> orgMemberModel, int invitedUserId, int userId);
    }
}