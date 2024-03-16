using System.ComponentModel.DataAnnotations;

namespace Models.Requests.NewsletterTemplates
{
    public class NewsletterTemplateAddRequest
    {
        [MinLength(2), MaxLength(100), Required]
        public string Name { get; set; }

        [MinLength(5), MaxLength(200), Required]
        public string Description { get; set; }

        [MinLength(5), MaxLength(255), Required]
        public string PrimaryImage { get; set; }
    }
}

