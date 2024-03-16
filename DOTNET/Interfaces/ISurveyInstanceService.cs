using Models;
using Models.Domain.SurveysInstances;
using Models.Requests.SurveysInstances;
using System.Collections.Generic;

namespace Services
{
    public interface ISurveyInstanceService
    {
        int AddSurveyInstance(SurveyInstanceAddRequest model);
        void UpdateSurveyInstance(SurveyInstanceUpdateRequest model);
        BaseSurveyInstance GetSurveyInstanceById(int id);
        Paged<BaseSurveyInstance> GetSurveyInstancesPaged(int pageIndex, int pageSize);
        Paged<BaseSurveyInstance> GetSurveyInstanceBySurveyId(int pageIndex, int pageSize, int surveyId);
        Paged<BaseSurveyInstance> GetSurveyInstanceByCreatedBy(int pageIndex, int pageSize, int userId);
        void DeleteSurveyInstanceById(int id);
        SurveyInstance GetSurveyInstanceByIdDetails(int id);
    }
}