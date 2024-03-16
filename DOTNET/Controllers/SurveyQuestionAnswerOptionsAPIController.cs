using Google.Apis.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Requests.SurveyQuestions;
using Models;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using Models.Domain.SurveyQuestions;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers.SurveyQuestions
{
    [Route("api/surveys/questions/answeroptions")]
    [ApiController]
    public class SurveyQuestionAnswerOptionsAPIController : BaseApiController
    {
        private ISurveyQuestionAnswerOptions _service = null;
        private IAuthenticationService<int> _authService = null;


        public SurveyQuestionAnswerOptionsAPIController(ISurveyQuestionAnswerOptions service
            , ILogger<SurveyQuestionAnswerOptionsAPIController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SurveyQuestionAnswerOptionsAddRequest model)
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
        public ActionResult<ItemResponse<SurveyQuestionAnswerOption>> GetQuestionById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                SurveyQuestionAnswerOption answerOption = _service.Get(id);

                if (answerOption == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveyQuestionAnswerOption> { Item = answerOption };
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
        public ActionResult<SuccessResponse> Update(SurveyQuestionAnswerOptionsUpdateRequest model, int userId)
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
        public ActionResult<ItemResponse<Paged<SurveyQuestionAnswerOption>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<SurveyQuestionAnswerOption> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<SurveyQuestionAnswerOption>> response = new ItemResponse<Paged<SurveyQuestionAnswerOption>>();
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

        [HttpGet("creator/{userId:int}")]
        public ActionResult<ItemsResponse<SurveyQuestionAnswerOption>> GetByCreatedBy(int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<SurveyQuestionAnswerOption> list = _service.GetByCreatedBy(userId);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Creator Associated with This SurveyQuestionAnswerOption");
                }
                else
                {
                    response = new ItemsResponse<SurveyQuestionAnswerOption> { Items = list };
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
    }
}
