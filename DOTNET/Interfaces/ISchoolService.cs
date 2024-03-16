using Models;
using Models.Domain.Schools;
using Models.Requests.Schools;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface ISchoolService
    {
        int AddSchool(SchoolAddRequest model, int userId);
        List<School> GetAll();
        School GetById(int id);
        Paged<School> GetPaged(int pageIndex, int pageSize);
        Paged<School> SearchPaged(int pageIndex, int pageSize, string query);
        void UpdateSchool(SchoolUpdateRequest model, int userId);
        void UpdateIsVerified(int schoolId, int userId);
        void UpdateIsDeleted(int schoolId, int userId);
    }
}