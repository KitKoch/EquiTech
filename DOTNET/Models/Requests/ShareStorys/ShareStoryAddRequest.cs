using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.ShareStorys
{
    public class ShareStoryAddRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Email { get; set; }

#nullable enable
        [StringLength(200)]
        public int? FileId { get; set; }

#nullable disable
        [Required]
        [StringLength(3000, MinimumLength = 2)]
        public string Story { get; set; }
    }
}

