using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Threads
{
    public class ThreadAddRequest
    {
#nullable enable
        public string? Subject { get; set; }
        public int? ParentId { get; set; }
#nullable disable
        [Required]
        [StringLength(4000)]
        public string Content { get; set; }
        [Required]
        public int ForumId { get; set; }
        [Required]
        public int CreatedBy { get; set; }
    }

}
