using Models;
using Models.Domain.UsersEducationLevels;
using Models.Requests.UsersEducationLevels;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IUserEducationService
    {
        UserEducation GetById(int id);
        List<UserEducation> GetByUserId(int UserId);
        Paged<UserEducation> GetPagedByCreatedBy(int userId, int pageIndex, int pageSize);
        int Add(UserEducationAddRequest model, int userId);
        int AddWithDegrees(UserEducationAddRequest model, int userId);
        void Delete(int id, int userId);
        void Update(UserEducationUpdateRequest model, int userId);
    }
}