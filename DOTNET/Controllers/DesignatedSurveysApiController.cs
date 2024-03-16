using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.DesignatedSurveys;
using Models.Domain.SurveyAnswers;
using Models.Requests.DesignatedSurveys;
using Models.Requests.SurveyAnswers;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/surveys/designated")]
    [ApiController]
    public class DesignatedSurveysApiController : BaseApiController
    {
        private IDesignatedSurveysService _service = null;
        private IAuthenticationService<int> _authService = null;

        public DesignatedSurveysApiController(IDesignatedSurveysService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(DesignatedSurveyAddRequest model)
        {
            ObjectResult result;

            try
            {
                int userId = _authService.GetCurrentUserId();
                IUserAuthData user = _authService.GetCurrentUser();
                int id = _service.AddDesignatedSurvey(model, userId);

                ItemResponse<int> response = new ItemResponse<int> { Item = id };

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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateDesignatedSurvey(DesignatedSurveyUpdateRequest model)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                int userId = _authService.GetCurrentUserId();
                IUserAuthData user = _authService.GetCurrentUser();
                _service.UpdateDesignatedSurvey(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("deleted/{id:int}")]
        public ActionResult<SuccessResponse> UpdateIsDeleted(DesignatedSurveyUpdateRequest model)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                int userId = _authService.GetCurrentUserId();
                IUserAuthData user = _authService.GetCurrentUser();
                _service.UpdateIsDeleted(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<DesignatedSurvey>> DesignatedSurveyGetById(int id)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                DesignatedSurvey designatedSurvey = _service.GetDesignatedSurveyById(id);
                if (designatedSurvey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Designated Survey Not Found");
                }
                else
                {
                    response = new ItemResponse<DesignatedSurvey> { Item = designatedSurvey };
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

        [HttpGet("surveytype/{id:int}")]
        public ActionResult<ItemResponse<DesignatedSurvey>> DesignatedSurveyGetBySurveyId(int id)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                DesignatedSurvey designatedSurvey = _service.GetDesignatedSurveyBySurveyId(id);
                if (designatedSurvey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Designated Surveys Not Found");
                }
                else
                {
                    response = new ItemResponse<DesignatedSurvey> { Item = designatedSurvey };
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

        [HttpGet("workflowtype/{id:int}")]
        public ActionResult<ItemResponse<DesignatedSurvey>> DesignatedSurveyGetByWorkflowTypeId(int id)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                DesignatedSurvey designatedSurvey = _service.GetDesignatedSurveyByWorkflowTypeId(id);
                if (designatedSurvey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Designated Surveys Not Found");
                }
                else
                {
                    response = new ItemResponse<DesignatedSurvey> { Item = designatedSurvey };
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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<DesignatedSurvey>>> DesignatedSurveysPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                Paged<DesignatedSurvey> page = _service.GetDesignatedSurveysPaged(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Designated Surveys Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<DesignatedSurvey>> { Item = page };
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
