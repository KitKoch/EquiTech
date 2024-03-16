using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Surveys;
using Models.Requests.Surveys;
using Services;
using Services.Interfaces.Survey;
using Web.Controllers;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/surveys")]
    [ApiController]
    public class SurveyApiController : BaseApiController
    {
        private ISurveyService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyApiController(ISurveyService service,
                IAuthenticationService<int> auth,
                ILogger<SurveyApiController> logger) : base(logger)
        {
            _service = service;
            _authService = auth;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(SurveyAddRequest request)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.AddSurvey(request, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;

        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Survey>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Survey> page = _service.GetAllByPagination(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Records Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Survey>> { Item = page };
                }

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Survey>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Survey survey = _service.GetById(id);

                if (survey == null)
                {
                    code = 404;
                    response = new ErrorResponse("NO Records.");
                }
                else
                {
                    response = new ItemResponse<Survey>() { Item = survey };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<Paged<Survey>>> GetAllCurrentUser(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                Paged<Survey> page = _service.GetByCreatedBy(pageIndex, pageSize, userId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Records Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Survey>> { Item = page };
                }

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(SurveyUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateSurvey(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                base.Logger.LogError(ex.ToString());

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
                _service.DeleteSurvey(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}
