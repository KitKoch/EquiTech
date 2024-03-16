using Google.Apis.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.UsersEducationLevels
{
    public class UserEducationAddRequest
    {
        [Range(1, Int32.MaxValue), Required]
        public int EducationLevelId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Range(0, int.MaxValue), AllowNull]
        public int? SchoolId { get; set; }

        [MinLength(0), AllowNull]
        public List<string> Degrees { get; set; }

        [MinLength(0), MaxLength(500), AllowNull]
        public string Description { get; set; }

        [AllowNull]
        public DateTime? EndDate { get; set; }
    }
}
