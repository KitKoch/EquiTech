using Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.CharitableFunds
{
    public class CharitableFundAddRequest
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }

#nullable enable

        [AllowNull]
        [MaxLength(1000)]
        public string Description { get; set; }

#nullable disable

        [Required]
        [Url]
        [MaxLength(255)]
        public string Url { get; set; }
    }
}
