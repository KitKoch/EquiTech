using Models.Domain.Emails;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Models.Requests.Emails
{
    public class SendEmailRequest
    {
        [Required]
        public EmailData Sender { get; set; }

        [Required]
        public EmailData To { get; set; }

        [AllowNull]
        public List<EmailData> Cc { get; set; }

        [AllowNull]
        public List<EmailData> Bcc { get; set; }

        [AllowNull]
        public EmailData ReplayTo { get; set; }

        [AllowNull]
        public string Subject { get; set; }

        [AllowNull]
        public string Header { get; set; }

        [AllowNull]
        public string Body { get; set; }

    }
}
