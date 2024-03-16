using Models;
using Models.Domain.Venues;
using Models.Requests.Venues;

namespace Services.Interfaces
{
    public interface IVenuesService
    {
        int Add(VenueAddRequest model, int userId);
        Venue GetById(int id);
        void Update(VenueUpdateRequest model, int userId);
        Paged<Venue> GetCreatedBy(int pageIndex, int pageSize, int createdBy);
        void Delete(int id);
        Paged<Venue> GetAllPaginated(int pageIndex, int pageSize);
        Paged<Venue> SearchPagination(int pageIndex, int pageSize, string query);
    }
}