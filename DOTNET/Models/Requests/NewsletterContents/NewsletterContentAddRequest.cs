using System.ComponentModel.DataAnnotations;
using System;

namespace Models.Requests.NewsletterContents
{
    public class NewsletterContentAddRequest
    {
        [Range(1, int.MaxValue), Required]
        public int TemplateKeyId { get; set; }

        [Range(1, int.MaxValue), Required]
        public int NewsletterId { get; set; }

        [MinLength(2), MaxLength(4000), Required]
        public string Value { get; set; }
    }
}
