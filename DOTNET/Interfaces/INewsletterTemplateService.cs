using Models;
using Models.Domain.Newsletters;
using Models.Requests.NewsletterTemplates;

namespace Services.Interfaces
{
    public interface INewsletterTemplateService
    {
        Paged<NewsletterTemplate> GetAll(int pageIndex, int pageSize);
        int Add(NewsletterTemplateAddRequest model, int userId);
        void Update(NewsletterTemplateUpdateRequest model);
        void Delete(int id);
    }
}