using Models.Domain.Files;
using System.Data;

namespace Services.Interfaces
{
    public interface IFileMapper
    {
        File MapFile(IDataReader reader, ref int index);
    }
}