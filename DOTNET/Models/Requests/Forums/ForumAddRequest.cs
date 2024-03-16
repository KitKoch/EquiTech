using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Forums
{
    public class ForumAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Invalid Name")]
        public string Name { get; set; }

        [Required]
        [StringLength(4000, MinimumLength = 1, ErrorMessage = "Invalid Description")]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Forum Category Id")]
        public int ForumCategoryId { get; set; }

        [Required]
        public bool IsPrivate { get; set; }

        [Required]
        public bool IsClosed { get; set; }
    }
}
