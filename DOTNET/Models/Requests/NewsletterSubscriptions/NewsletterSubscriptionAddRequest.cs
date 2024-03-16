using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.NewsletterSubscriptions
{
    public class NewsletterSubscriptionAddRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public bool IsSubscribed { get; set; }
    }
}
