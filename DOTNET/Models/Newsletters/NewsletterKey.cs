using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Newsletters
{
    public class NewsletterKey
    {
        public int KeyId { get; set; }
        public string KeyName { get; set; }
        public int TemplateId { get; set; }
        public LookUp Type { get; set; }
        public string Content { get; set; }
    }
}
