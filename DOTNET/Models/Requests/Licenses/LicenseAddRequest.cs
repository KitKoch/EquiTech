using System;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests.Licenses
{
    public class LicenseAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int LicenseStateId { get; set; }
        [Required]
        [StringLength(50)]
        public string LicenseNumber { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        [StringLength(50)]
        public string LicenseName { get; set; }
        [Required]
        public DateTime ExpirationDate { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int FileId { get; set; }

    }
}