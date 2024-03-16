using Models.Domain.UserDemographics;
using Models.Requests.UserDemographicsRequests;

namespace Services
{
    public interface IUserDemographicsService
    {
        int Add(UserDemographicsAddRequest model, int userId);
        void Delete(int id, int userId);
        UserDemographics GetById(int id);
        void Update(UserDemographicsUpdateRequest model, int userId);
    }
}