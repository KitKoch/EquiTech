using Models;
using Models.Domain.Ratings;
using Models.Requests.Ratings;

namespace Services.Interfaces
{
    public interface IRatingService
    {
        Rating Get(int id);

        Paged<Rating> GetByCreatedBy(int pageIndex, int pageSize, int createdBy);

        Paged<Rating> GetAllPaginated(int pageIndex, int pageSize);

        int Add(RatingAddRequest rating, int userId);

        void Update(RatingUpdateRequest rating, int userId);

        void Delete(RatingUpdateRequest rating, int userId);

        Paged<Rating> GetByEntityId(int pageIndex, int pageSize, int EntityTypeId, int EntityId);

        int GetAverage(int identityTypeId, int entityId);
    }
}