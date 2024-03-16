using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Users
{
    public class UserAddRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Must be at least 2 Characters")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Must be at least 2 Characters")]
        public string LastName { get; set; }

#nullable enable
        [AllowNull]
        [MaxLength(2)]
        public string Mi { get; set; }

        [AllowNull]
        public string AvatarUrl { get; set; }

#nullable disable

        [Required]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            , ErrorMessage = "Password must contain at least 8 characters; 1 uppercase letter; 1 lowercase letter; 1 number; 1 symbol (#?!@$%^&*-)")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "The Passwords do not Match")]
        public string PasswordConfirm { get; set; }

        [Required]
        public int StatusId { get; set; }

        [Required]
        public bool IsProfileViewable { get; set; }

    }
}
