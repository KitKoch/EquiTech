using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Users
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        [MinLength(2)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(1)]
        public string Password { get; set; }
    }
}
