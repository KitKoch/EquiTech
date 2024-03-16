using Models.Domain.Blogs;
using Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests.Blogs
{
    public class BlogAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int BlogTypeId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Title { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Subject { get; set; }

        [StringLength(4000, MinimumLength = 2)]
        public string Content { get; set; }
        [Required]
        public bool IsPublished { get; set; }

        public string ImageUrl { get; set; }

        public DateTime? DatePublished { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
