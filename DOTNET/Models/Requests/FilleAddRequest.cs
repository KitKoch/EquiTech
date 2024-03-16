using System;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests
{
    public class FileAddRequest
    {
        [Required(ErrorMessage = "File name can not be empty")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "File name must be longer than zero and not exceed 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Url can not be empty")]
        [Url(ErrorMessage = "Url is not valid")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Url can not exceed 255 characters")]
        public string Url { get; set; }

        [Required]
        [Range(0, 100000000, ErrorMessage = "File size exceed limit")]
        public int FileSize { get; set; }

        [Required(ErrorMessage = "FileType can not be empty")]
        [Range(1, double.MaxValue, ErrorMessage = "FileType is not valid")]
        public int FileTypeId { get; set; }

    }
}
