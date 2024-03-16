using Models;
using Models.Domain.DesignatedSurveys;
using Models.Requests.DesignatedSurveys;

namespace Services.Interfaces
{
    public interface IDesignatedSurveysService
    {
        int AddDesignatedSurvey(DesignatedSurveyAddRequest model, int userId);
        void UpdateDesignatedSurvey(DesignatedSurveyUpdateRequest model, int userId);
        void UpdateIsDeleted(DesignatedSurveyUpdateRequest model, int userId);
        DesignatedSurvey GetDesignatedSurveyById(int id);
        DesignatedSurvey GetDesignatedSurveyBySurveyId(int id);
        DesignatedSurvey GetDesignatedSurveyByWorkflowTypeId(int id);
        Paged<DesignatedSurvey> GetDesignatedSurveysPaged(int pageIndex, int pageSize);
    }
}