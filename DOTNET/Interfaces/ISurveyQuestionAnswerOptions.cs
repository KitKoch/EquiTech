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
    public interface ISurveyQuestionAnswerOptions
    {
        int Add(SurveyQuestionAnswerOptionsAddRequest model, int userId);
        void Update(SurveyQuestionAnswerOptionsUpdateRequest model, int userId);
        SurveyQuestionAnswerOption Get(int id);
        List<SurveyQuestionAnswerOption> GetByCreatedBy(int createdBy);
        Paged<SurveyQuestionAnswerOption> Pagination(int pageIndex, int pageSize);
        void Delete(int id);
    }
}
