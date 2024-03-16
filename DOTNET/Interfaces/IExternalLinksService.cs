using Models;
using Models.Domain.ExternalLinks;
using Models.Requests.ExternalLinks;
using System.Data;

namespace Services.Interfaces
{
    public interface IExternalLinkService
    {
        int Create(ExternalLinkAddRequest request, int userId);
        void Delete(int Id);
        Paged<ExternalLink> ExternalLinksSelectByCreatedBy(int pageIndex, int pageSize, int userId);
        ExternalLink MapExternalLinks(IDataReader reader, ref int startingIndex);
        void Update(ExternalLinkUpdateRequest request);

    }
}