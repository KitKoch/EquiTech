using Models;
using Models.Domain.SurveyQuestions;
using Models.Requests.SurveyQuestions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISurveyQuestionsService
    {
        int Add(SurveyQuestionsAddRequest model, int userId);

        void Update(SurveyQuestionsUpdateRequest model, int userId);

        BaseSurveyQuestion Get(int id);

        Paged<BaseSurveyQuestion> GetByCreatedBy(int userId, int pageSize, int pageIndex);

        Paged<BaseSurveyQuestion> Pagination(int pageIndex, int pageSize);

        void Delete(int id);

        List<SurveyQuestion> GetSurveyQuestionsBySurveyId(int surveyId);

    }
}
