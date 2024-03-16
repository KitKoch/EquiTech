using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.ShareStorys
{
    public class ShareStoryUpdate : ShareStoryAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
