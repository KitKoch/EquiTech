using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Ratings
{
    public class RatingUpdateRequest : RatingAddRequest, IModelIdentifier
    {
        [Required(ErrorMessage = "Id is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Id greater than 0 is required")]
        public int Id { get; set; }
    }
}
