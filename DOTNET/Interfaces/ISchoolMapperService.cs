using Models.Domain.Schools;
using System.Data;

namespace Services.Interfaces
{
    public interface ISchoolMapperService
    {
        School MapSingleSchool(IDataReader reader, ref int startingIndex);
    }
}