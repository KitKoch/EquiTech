using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.SurveyAnswers;
using Models.Domain.SurveyQuestions;
using Models.Requests.SurveyAnswers;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;

namespace Web.Api.Controllers
{
    [Route("api/surveys/questions")]
    [ApiController]
    public class SurveyQuestionApiController : BaseApiController
    {
        private ISurveyQuestionsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyQuestionApiController(ISurveyQuestionsService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<BaseSurveyQuestion>>> SurveyAnswerPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<BaseSurveyQuestion> page = _service.Pagination(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Paged Survey Answer Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurveyQuestion>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }


    }
}
