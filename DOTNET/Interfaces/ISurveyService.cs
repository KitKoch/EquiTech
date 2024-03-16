using Models;
using Models.Requests.Surveys;

namespace Services.Interfaces.Survey
{
    public interface ISurveyService
    {
        int AddSurvey(SurveyAddRequest model, int userId);
        void DeleteSurvey(int id);
        Paged<Models.Domain.Surveys.Survey> GetAllByPagination(int pageIndex, int pageSize);
        Paged<Models.Domain.Surveys.Survey> GetByCreatedBy(int pageIndex, int pageSize, int userId);
        Models.Domain.Surveys.Survey GetById(int id);
        void UpdateSurvey(SurveyUpdateRequest request);
    }
}