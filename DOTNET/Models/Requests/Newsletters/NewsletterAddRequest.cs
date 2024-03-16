using Models.Domain;
using Models.Domain.Newsletters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Models.Requests.Newsletters
{
    public class NewsletterAddRequest
    {
        [Range(1, int.MaxValue), Required]
        public int TemplateId { get; set; }

        [Range(1, int.MaxValue), Required]
        public int CategoryId { get; set; }

        [MinLength(15), MaxLength(255), AllowNull]
        public string Description { get; set; }

        [MinLength(2), MaxLength(255), Required]
        public string Name { get; set; }

        [MinLength(15), MaxLength(255), AllowNull]
        public string CoverPhoto { get; set; }

        [Required]
        public bool isSubscribed { get; set; }

        [AllowNull]
        public DateTime DateToPublish { get; set; }

        [AllowNull]
        public DateTime DateToExpire { get; set; }

        [Required]
        public List<ContentAddRequest> Contents { get; set; }
    }
}
