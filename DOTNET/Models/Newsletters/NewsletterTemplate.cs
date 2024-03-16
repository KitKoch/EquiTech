using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Newsletters
{
    public class NewsletterTemplate
    {
        public int TemplateId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PrimaryImage { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser CreatedBy { get; set; }
        public List<NewsletterKey> TemplateKeys { get; set; }
    }
}
