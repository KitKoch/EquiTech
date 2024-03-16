using Models;
using Models.Domain.Locations;
using Models.Requests.Locations;
using System.Collections.Generic;
using System.Data;

namespace Services.Interfaces
{
    public interface ILocationService
    {
        Location Get(int id);
        Paged<Location> GetByCreatedBy(int pageIndex, int pageSize, int createdId);
        Paged<Location> GetPaginated(int pageIndex, int pageSize);
        List<Location> GetAll();
        int Add(LocationAddRequest location, int userId);
        void Update(LocationUpdateRequest location, int userId);
        void Delete(int id);
        Location MapSingleLocation(IDataReader reader, ref int startingIndex);
    }
}