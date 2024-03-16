using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Users
{
    public class ChangePasswordRequest
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
        [MinLength(8)]
        [MaxLength(64)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(1)]
        [Compare("Password", ErrorMessage = "Password fields do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
