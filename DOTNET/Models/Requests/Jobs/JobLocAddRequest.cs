using System;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests.Jobs
{
    public class JobLocAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int JobId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int LocationId { get; set; }
    }
}
