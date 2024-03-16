using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using Services.Interfaces;
using Models.Requests.Emails;
using Microsoft.Extensions.Options;
using Models.AppSettings;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Models.Domain.Emails;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;
using System.Security.Cryptography.X509Certificates;
using Models.Requests.ContactUs;
using Models.Domain.InviteMembers;
using Models.Domain.OrganizationMembers;

namespace Services
{
    public class EmailSenderService : IEmailSenderService
    {
        private AppKeys _appKeys;
        private AdminInfo _adminInfo;
        IWebHostEnvironment _env;
        public IConfiguration _configuration { get; set; }
        private ILookUpService _lookupService;


        public EmailSenderService(IOptions<AppKeys> appKeys, IWebHostEnvironment webHostEnvironment, IConfiguration configuration,
            ILookUpService lookupService, IOptions<AdminInfo> adminInfo)
        {
            _appKeys = appKeys.Value;
            _adminInfo = adminInfo.Value;
            _env = webHostEnvironment;
            _configuration = configuration;
            _lookupService = lookupService;
            Configuration.Default.AddApiKey("api-key", _appKeys.SendInBlueAPIKey);
        }

        public void SmtpEmailMessage(SendEmailRequest model)
        {
            string templatePath = $"{_env.WebRootPath}/EmailTemplates/Template1/baseTemplate.html";
            string template = File.ReadAllText(templatePath);

            string urlExtension = $"/newsletter/unsubscribe";
            string unsubPage = $"{_configuration.GetValue<string>("HostUrl:Url")}{urlExtension}";

            string newsletterTemplate = template.Replace("{{unsubscribeUrl}}", unsubPage);

            List<SendSmtpEmailTo> sendSmtpEmailTos = new List<SendSmtpEmailTo>();
            SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo(model.To.Email, model.To.Name);
            sendSmtpEmailTos.Add(sendSmtpEmailTo);

            List<string> tags = new List<string>();
            string tag = "Welcome!";
            tags.Add(tag);

            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(
                sender: new SendSmtpEmailSender(model.Sender.Name, model.Sender.Email),
                to: sendSmtpEmailTos,
                subject: $"Welcome to Fairly, {model.To.Name}!",
                htmlContent: newsletterTemplate,
                tags: tags,
                replyTo: new SendSmtpEmailReplyTo(name: "Admin", email: model.Sender.Email)
                );

            SendInBlueEmailAsync(sendSmtpEmail);

            SmtpAdminEmailMessage(model.To, sendSmtpEmail.Sender);
        }

        private void SmtpAdminEmailMessage(EmailData reciever, SendSmtpEmailSender sender)
        {
            string adminMessageTemplate = $"<html><body><h1>We have a new subscriber!</h1> <h5> It's name is {reciever.Name} and this is the mail direction: {reciever.Email} that recieved the welcome email.</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a massa a nibh pharetra vehicula. Suspendisse sodales ornare ultrices. Sed interdum dui sed nibh pretium efficitur. Etiam aliquam interdum sollicitudin. Proin facilisis hendrerit efficitur.</p></body></html>";

            List<SendSmtpEmailTo> sendSmtpEmailTo = new List<SendSmtpEmailTo>();
            SendSmtpEmailTo toAdmin = new SendSmtpEmailTo(sender.Email, "Admin");
            sendSmtpEmailTo.Add(toAdmin);

            List<string> tags = new List<string>();
            string tag = "AdminBcc ";
            tags.Add(tag);

            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(
                sender: new SendSmtpEmailSender(sender.Name, sender.Email),
                to: sendSmtpEmailTo,
                subject: $"A New Customer:  {reciever.Name}",
                htmlContent: adminMessageTemplate,
                tags: tags
                );

            SendInBlueEmailAsync(sendSmtpEmail);
        }

        public void SendChangePasswordEmail(SendEmailRequest model, string token)
        {
            string templatePath = $"{_env.WebRootPath}/EmailTemplates/Template1/forgotPasswordTemplate.html";
            string template = File.ReadAllText(templatePath);
            StringBuilder inviteHtml = new StringBuilder(template);
            inviteHtml.Replace("{{createdByName}}", $"{_configuration.GetValue<string>("HostUrl:Url")}/changepassword?token={token}&email={model.To.Email}");
            inviteHtml.Replace("{{organizationName}}", $"{_configuration.GetValue<string>("HostUrl:Url")}/changepassword?token={token}&email={model.To.Email}");
            inviteHtml.Replace("{{organizationImg}}", $"{_configuration.GetValue<string>("HostUrl:Url")}/changepassword?token={token}&email={model.To.Email}");
            inviteHtml.Replace("{{newPasswordLink}}", $"{_configuration.GetValue<string>("HostUrl:Url")}/changepassword?token={token}&email={model.To.Email}");

            List<SendSmtpEmailTo> sendSmtpEmailTos = new List<SendSmtpEmailTo>();
            SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo(model.To.Email, model.To.Name);
            sendSmtpEmailTos.Add(sendSmtpEmailTo);

            List<string> tags = new List<string>();
            string tag = "Welcome!";
            tags.Add(tag);

            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(
                sender: new SendSmtpEmailSender(model.Sender.Name, model.Sender.Email),
                to: sendSmtpEmailTos,
                subject: "Reset Fairly Password",
                htmlContent: inviteHtml.ToString(),
                tags: tags,
                replyTo: new SendSmtpEmailReplyTo(name: "Admin", email: model.Sender.Email)
                );

            SendInBlueEmailAsync(sendSmtpEmail);
        }

        public void ContactUsMessage(ContactUsEmailRequest model)
        {
            string template = $"<html><h1>New message from contact us!</h1><h5>Customer info:</h5><h5>Name: {model.Sender.Name}</h5><h5>Email: {model.Sender.Email}</h5><h5>Message: {model.Body}</h5></html>";
            EmailData to = new EmailData
            {
                Email = _adminInfo.Email,
                Name = _adminInfo.Name
            };
            model.To = to;
            List<SendSmtpEmailTo> sendSmtpEmailTos = new List<SendSmtpEmailTo>();
            SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo(model.To.Email, model.To.Name);
            sendSmtpEmailTos.Add(sendSmtpEmailTo);
            List<string> tags = new List<string>();
            string tag = "Contact us message.";
            tags.Add(tag);
            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(
                sender: new SendSmtpEmailSender(model.Sender.Name, model.Sender.Email),
                to: sendSmtpEmailTos,
                subject: $"We got a new message from {model.Sender.Name}.",
                htmlContent: template,
                tags: tags,
                replyTo: new SendSmtpEmailReplyTo(name: "Customer", email: model.Sender.Email)
                );
            SendInBlueEmailAsync(sendSmtpEmail);
        }
        public void SendNewUserInviteEmail(InviteMember inviteModel)
        {
            EmailData emailTo = new()
            {
                Email = inviteModel.Email,
                Name = inviteModel.FirstName
            };
            string templatePath = $"{_env.WebRootPath}/EmailTemplates/Template1/inviteEmailTemplate.html";
            string template = File.ReadAllText(templatePath);
            StringBuilder inviteHtml = new StringBuilder(template);
            inviteHtml.Replace("{{createdByName}}", $"{inviteModel.CreatedBy.FirstName} {inviteModel.CreatedBy.LastName}");
            inviteHtml.Replace("{{organizationName}}", inviteModel.OrganizationId.Name);
            inviteHtml.Replace("{{organizationImg}}", inviteModel.OrganizationId.Col3);
            inviteHtml.Replace("{{inviteLink}}", $"{_configuration.GetValue<string>("HostUrl:Url")}/invite?token={inviteModel.Token}");
            SmtpSendInviteEmailMessage(inviteHtml.ToString(), emailTo);
        }
        public void SendExistingUserInviteEmail(List<OrganizationMemberV2> orgMembers, int invitedUserId, int userId)
        {
            string createdByName = null;
            EmailData emailTo = new EmailData();
            foreach (OrganizationMemberV2 member in orgMembers)
            {
                if (member.User.Id == userId)
                {
                    createdByName = $"{member.User.FirstName} {member.User.LastName}";
                }
                else if (member.Id == invitedUserId)
                {
                    emailTo.Email = member.User.Email;
                    emailTo.Name = $"{member.User.FirstName} {member.User.LastName}";
                }
            }
            string templatePath = $"{_env.WebRootPath}/EmailTemplates/Template1/InviteExistingUserToOrgEmailTemplate.html";
            string template = File.ReadAllText(templatePath);
            StringBuilder inviteHtml = new StringBuilder(template);
            inviteHtml.Replace("{{createdByName}}", createdByName);
            inviteHtml.Replace("{{organizationName}}", orgMembers[0].Organization.Name);
            inviteHtml.Replace("{{organizationImg}}", orgMembers[0].Organization.Logo);
            inviteHtml.Replace("{{loginLink}}", $"{_configuration.GetValue<string>("HostUrl:Url")}/auth/signin");
            SmtpSendInviteEmailMessage(inviteHtml.ToString(), emailTo);
        }
        private void SmtpSendInviteEmailMessage(string htmlModel, EmailData emailTo)
        {
            SendEmailRequest model = new SendEmailRequest();
            model.Sender = new EmailData
            {
                Email = _adminInfo.Email,
                Name = _adminInfo.Name
            };
            model.To = new EmailData
            {
                Email = emailTo.Email,
                Name = emailTo.Name
            };
            List<SendSmtpEmailTo> sendSmtpEmailTos = new List<SendSmtpEmailTo>();
            SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo(model.To.Email, model.To.Name);
            sendSmtpEmailTos.Add(sendSmtpEmailTo);
            List<string> tags = new List<string>();
            string tag = "Welcome!";
            tags.Add(tag);

            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(
                sender: new SendSmtpEmailSender(model.Sender.Name, model.Sender.Email),
                to: sendSmtpEmailTos,
                subject: $"Welcome to Fairly, {model.To.Name}!",
                htmlContent: htmlModel,
                tags: tags
                );
            SendInBlueEmailAsync(sendSmtpEmail);
        }

        private async void SendInBlueEmailAsync(SendSmtpEmail email)
        {
            TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
            await apiInstance.SendTransacEmailAsync(email);
        }
    }
}
