using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.SurveysInstances;
using Models.Requests.SurveysInstances;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/surveysinstances")]
    [ApiController]
    public class SurveyInstanceApiController : BaseApiController
    {
        private ISurveyInstanceService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyInstanceApiController(ISurveyInstanceService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SurveyInstanceAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.AddSurveyInstance(model);

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
        public ActionResult<SuccessResponse> UpdateSurveyInstance(SurveyInstanceUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateSurveyInstance(model);
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
        public ActionResult<ItemResponse<BaseSurveyInstance>> SurveyInstanceGet(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                BaseSurveyInstance surveyInstance = _service.GetSurveyInstanceById(id);
                if (surveyInstance == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Instance Not Found");
                }
                else
                {
                    response = new ItemResponse<BaseSurveyInstance> { Item = surveyInstance };
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
        public ActionResult<ItemResponse<Paged<BaseSurveyInstance>>> SurveyInstancePagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<BaseSurveyInstance> page = _service.GetSurveyInstancesPaged(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Paged Survey Instances Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurveyInstance>> { Item = page };
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

        [HttpGet("paginatesurvey/{id:int}")]
        public ActionResult<ItemResponse<Paged<BaseSurveyInstance>>> GetSurveyInstanceBySurveyIdPaged(int pageIndex, int pageSize, int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<BaseSurveyInstance> page = _service.GetSurveyInstanceBySurveyId(pageIndex, pageSize, id);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Survey Instance Associated with This Survey Id");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurveyInstance>> { Item = page };
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

        [HttpGet("paginateuser/{id:int}")]
        public ActionResult<ItemResponse<Paged<BaseSurveyInstance>>> GetSurveyInstanceByCreatedByPaged(int pageIndex, int pageSize, int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<BaseSurveyInstance> page = _service.GetSurveyInstanceByCreatedBy(pageIndex, pageSize, id);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Survey Instance Associated with This User Id");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurveyInstance>> { Item = page };
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

        [HttpGet("{id:int}/details")]
        public ActionResult<ItemResponse<SurveyInstance>> GetSurveyInstanceByIdDetail(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyInstance surveyInstance = _service.GetSurveyInstanceByIdDetails(id);
                if (surveyInstance == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Instance Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveyInstance> { Item = surveyInstance };
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
        public ActionResult<SuccessResponse> DeleteSurveyInstanceById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteSurveyInstanceById(id);
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