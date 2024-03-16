using Models;
using Models.Domain.CandidateLocations;
using Models.Requests.CandidateLocationsRequest;
using System.Collections.Generic;

namespace Services
{
    public interface ICandidateLocationServices
    {
        int AddCandidateLocation(CandidateLocationsAddRequest model, int userId);
        int AddCandidateLocationForm(CandidateLocationsFormAddRequest model, int userId);
        List<CandidateLocation> GetCandidateLocationsByUserId(int id);
        Paged<CandidateLocation> GetCandidateLocationByLocationIdRange(int start, int end, int pageIndex, int pageSize);
        Paged<CandidateLocation> GetCandidateLocationByGeoLocationIdRange(double lat, double lng, int distance, int pageIndex, int pageSize);
        void UpdateCandidateLocation(CandidateLocationsUpdateRequest model, int userId);
        void UpdateCandidateLocationForm(CandidateLocationsFormUpdateRequest model, int userId);
        void DeleteCandidateLocation(int userId);
        List<CandidateLocation> GetCandidateLocationByPreferenceId(int preferenceId);
    }
}