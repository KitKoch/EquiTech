using Models.Domain.Newsletters;
using Models.Requests.NewsletterContents;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface INewsletterContentService
    {
        List<NewsletterContent> GetByNewsletter(int id);
        int Add(NewsletterContentAddRequest model, int userId);
        void Update(NewsletterContentUpdateRequest model);
        void Delete(int Id);
    }
}