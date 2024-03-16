using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Newsletters
{
    public class NewsletterContent
    {
        public int ContentId { get; set; }
        public int NewsletterId { get; set; }
        public string Value { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser CreatedBy { get; set; }
        public NewsletterKey TemplateKey { get; set; }
    }
}
