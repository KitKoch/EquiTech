using Models;
using Models.Domain.SurveyAnswers;
using Models.Requests.SurveyAnswers;
using System.Collections.Generic;

namespace Services
{
    public interface ISurveyAnswerService
    {
        int AddSurveyAnswer(SurveyAnswerAddRequest model);
        void UpdateSurveyAnswer(SurveyAnswerUpdateRequest model);
        SurveyAnswer GetSurveyAnswerById(int id);
        Paged<SurveyAnswer> GetSurveyAnswerPaged(int pageIndex, int pageSize);
        List<SurveyAnswer> GetSurveyAnswerByInstanceId(int instanceId);
        Paged<SurveyAnswer> GetSurveyAnswerByCreatedBy(int pageIndex, int pageSize, int userId);
        Paged<SurveyInstanceAnsweredBy> GetSurveyInstancesAnswerPaged(int pageIndex, int pageSize);
        void DeleteSurveyAnswerById(int id);
    }
}