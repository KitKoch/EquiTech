using Models;
using Models.Domain.CandidatePreferences;
using Models.Requests.CandidatePreferencesRequest;

namespace Services
{
    public interface ICandidatePreferenceServices
    {
        int Add(CandidatePreferencesAddRequest model, int userId);
        void Delete(CandidatePreferencesDeleteRequest model);
        CandidatePreference GetById(int id);
        CandidatePreference GetByUserId(int userId);
        void Update(CandidatePreferencesUpdateRequest model);
    }
}