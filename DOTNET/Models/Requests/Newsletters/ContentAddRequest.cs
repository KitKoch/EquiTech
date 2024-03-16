using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Newsletters
{
    public class ContentAddRequest
    {
        public string Content { get; set; }
        public int KeyId { get; set; }
    }
}
