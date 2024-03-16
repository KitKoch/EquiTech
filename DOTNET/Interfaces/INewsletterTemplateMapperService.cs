using Models.Domain.Newsletters;
using System.Data;

namespace Services.Interfaces
{
    public interface INewsletterTemplateMapperService
    {
        NewsletterTemplate MapSingleTemplate(IDataReader reader, ref int index);
    }
}