using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.SurveyAnswers;
using Models.Requests.SurveyAnswers;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/surveys/answers")]
    [ApiController]
    public class SurveyAnswerApiController : BaseApiController
    {
        private ISurveyAnswerService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyAnswerApiController(ISurveyAnswerService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SurveyAnswerAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.AddSurveyAnswer(model);

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
        public ActionResult<SuccessResponse> UpdateSurveyAnswer(SurveyAnswerUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateSurveyAnswer(model);
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
        public ActionResult<ItemResponse<SurveyAnswer>> SurveyAnswerGet(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyAnswer surveyAnswer = _service.GetSurveyAnswerById(id);
                if (surveyAnswer == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Answer Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveyAnswer> { Item = surveyAnswer };
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
        public ActionResult<ItemResponse<Paged<SurveyAnswer>>> SurveyAnswerPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyAnswer> page = _service.GetSurveyAnswerPaged(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Paged Survey Answer Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyAnswer>> { Item = page };
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

        [HttpGet("paginate/answered")]
        public ActionResult<ItemResponse<Paged<SurveyAnswer>>> InstanceAnsweredByPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyInstanceAnsweredBy> page = _service.GetSurveyInstancesAnswerPaged(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Instances Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyInstanceAnsweredBy>> { Item = page };
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

        [HttpGet("instance/{id:int}")]
        public ActionResult<ItemsResponse<SurveyAnswer>> SurveyAnswerGetByInstanceId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<SurveyAnswer> list = _service.GetSurveyAnswerByInstanceId(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Survey Answer Associated with This Instance");
                }
                else
                {
                    response = new ItemsResponse<SurveyAnswer> { Items = list };
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

        [HttpGet("paginate/{id:int}")]
        public ActionResult<ItemResponse<Paged<SurveyAnswer>>> GetSurveyAnswerByUserId(int pageIndex, int pageSize, int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyAnswer> page = _service.GetSurveyAnswerByCreatedBy(pageIndex, pageSize, id);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Paged Survey Answer Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyAnswer>> { Item = page };
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
        public ActionResult<SuccessResponse> DeleteSurveyAnswerById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteSurveyAnswerById(id);
                response = new SuccessResponse();
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
