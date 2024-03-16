using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Ratings
{
    public class Rating
    {
        public int Id { get; set; }

        public Byte RatingScore { get; set; }
        public int CommentId { get; set; }
        public LookUp EntityType { get; set; }

        public int EntityId { get; set; }

        public BaseUser CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateModified { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
