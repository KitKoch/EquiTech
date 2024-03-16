using Models.Domain;
using Models.Domain.UsersEducationLevels;
using Models.Requests.UsersEducationLevels;
using System.Collections.Generic;
using System.Data;

namespace Services.Interfaces
{
    public interface IDegreeService
    {
        void BatchInsert(List<string> degrees);
        DataTable MapSingleDegree(List<string> degreesToMap);
    }
}