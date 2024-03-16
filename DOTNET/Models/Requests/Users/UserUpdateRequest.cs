using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Users
{
    public class UserUpdateRequest
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id is required and must be positive number")]
        public int Id { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

    }
}
