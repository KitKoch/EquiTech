using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Ratings
{
    public class RatingAddRequest
    {
        [Required(ErrorMessage = "A Rating is required")]
        [Range(1, Byte.MaxValue, ErrorMessage = "A Rating greater than 0 is required")]
        public Byte Rating { get; set; }

        [Required(ErrorMessage = "A CommentId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A CommentId greater than 0 is required")]
        public int CommentId { get; set; }


        [Required(ErrorMessage = "A EntityTypeId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A EntityTypeId greater than 0 is required")]
        public int EntityTypeId { get; set; }

        [Required(ErrorMessage = "A EntityId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "A EntityId greater than 0 is required")]
        public int EntityId { get; set; }
    }
}
