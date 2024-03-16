using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Threads
{
    public class ThreadUpdateRequest : ThreadAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}
