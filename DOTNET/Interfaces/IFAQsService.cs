using Models.Domain.FAQ;
using Models.Requests.FAQ;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IFAQsService
    {
        int Add(FAQAddRequest model, int userId);
        void Delete(int Id);
        List<FAQ> GetAll();
        List<FAQ> GetByCategory(int categoryId);
        void Update(FAQUpdateRequest model, int userId);
    }
}