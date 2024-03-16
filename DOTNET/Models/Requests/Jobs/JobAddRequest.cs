using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Jobs
{
    public class JobAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [StringLength(4000, MinimumLength = 2)]
        public string Description { get; set; }

        [Required]
        [StringLength(3000, MinimumLength = 2)]
        public string Requirements { get; set; }

        [Required]
        [Range(1, 10000)]
        public int JobTypeId { get; set; }

        [Required]
        [Range(1, 10000)]
        public int JobStatusId { get; set; }

        [Required]
        [Range(1, 10000)]
        public int OrganizationId { get; set; }

        [Required]
        [Range(1, 10000)]
        public int LocationId { get; set; }

        [Required]
        [Range(1, 10000)]
        public int RemoteStatusId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string ContactName { get; set; }

#nullable enable annotations
        public string ContactPhone { get; set; }

#nullable enable annotations
        public string ContactEmail { get; set; }

#nullable enable annotations
        public DateTime EstimatedStartDate { get; set; }

#nullable enable annotations
        public DateTime EstimatedFinishDate { get; set; }
    }
}
