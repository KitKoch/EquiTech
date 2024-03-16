using Models.Domain.Newsletters;
using Models;
using Models.Requests.Newsletters;
using System.Collections.Generic;
using Models.Domain.Blogs;

namespace Services.Interfaces
{
    public interface INewsletterService
    {
        List<Newsletter> GetByCategory(int categoryId);
        Paged<Newsletter> GetAll(int pageIndex, int pageSize);
        Paged<Newsletter> PaginationNewsletterType(int pageIndex, int pageSize, int categoryId);
        int Add(NewsletterAddRequest model, int userId);
        void Update(NewsletterUpdateRequest model);
        void Delete(int id);
    }
}