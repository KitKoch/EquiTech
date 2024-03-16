using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Skills;
using Models.Domain.SurveyQuestions;
using Models.Requests.SurveyQuestions;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers.SurveyQuestions
{
    [Route("api/surveys/questions")]
    [ApiController]
    public class SurveyQuestionsApiController : BaseApiController
    {
        private ISurveyQuestionsService _service = null;
        private IAuthenticationService<int> _authService = null;
        public SurveyQuestionsApiController(ISurveyQuestionsService service
            , ILogger<SurveyQuestionsApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SurveyQuestionsAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<BaseSurveyQuestion>> GetQuestionById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                BaseSurveyQuestion surveyQuestion = _service.Get(id);

                if (surveyQuestion == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<BaseSurveyQuestion> { Item = surveyQuestion };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(SurveyQuestionsUpdateRequest model, int userId)
        {
            int iCode = 200;

            BaseResponse response = null;

            try
            {
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<BaseSurveyQuestion>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<BaseSurveyQuestion> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<BaseSurveyQuestion>> response = new ItemResponse<Paged<BaseSurveyQuestion>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
        [HttpGet("creator")]
        public ActionResult<ItemResponse<Paged<BaseSurveyQuestion>>> GetAllCurrentUser(int pageSize, int pageIndex, int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<BaseSurveyQuestion> list = _service.GetByCreatedBy(pageSize, pageIndex, userId);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Creator Associated with This SurveyQuestion");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurveyQuestion>> { Item = list };
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("survey/{id:int}")]
        public ActionResult<ItemsResponse<SurveyQuestion>> GetSurveyQuestionBySurveyId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<SurveyQuestion> list = _service.GetSurveyQuestionsBySurveyId(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Survey Question Associated with This Survey Id");
                }
                else
                {
                    response = new ItemsResponse<SurveyQuestion> { Items = list };
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