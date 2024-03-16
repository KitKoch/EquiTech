using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.NewsletterTemplates
{
    public class NewsletterTemplateUpdateRequest : NewsletterTemplateAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
