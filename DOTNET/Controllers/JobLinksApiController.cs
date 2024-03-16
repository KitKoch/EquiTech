using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services;
using Web.Controllers;
using Models.Requests;
using Web.Models.Responses;
using System;
using Models.Requests.Jobs;
using Models.Domain;
using Models.Domain.Jobs;
using Models;
using Web.Core.Services;

namespace Web.Api.Controllers
{
    [Route("api/joblinks")]
    [ApiController]
    public class JobLinksApiController : BaseApiController
    {
        private IJobService _service;
        private IAuthenticationService<int> _authService;
        public JobLinksApiController(IJobService service,
            ILogger<JobLinksApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> AddJobLink(JobLinksAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddJobLink(model, userId);
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
        public ActionResult<ItemResponse<JobLink>> GetJobLinkById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                JobLink job = _service.GetJobLinkById(id);

                if (job == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("JobLink not found.");
                    return NotFound404(response);
                }
                else
                {
                    response = new ItemResponse<JobLink> { Item = job };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("code/{uniqueCode}")]
        public ActionResult<ItemResponse<JobLink>> GetJobLinkByCode(string uniqueCode)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                JobLink job = _service.GetJobLinkByCode(uniqueCode);

                if (job == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("JobLink not found.");
                    return NotFound404(response);
                }
                else
                {
                    response = new ItemResponse<JobLink> { Item = job };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("organization/{orgId:int}")]
        public ActionResult<ItemResponse<Paged<JobLink>>> GetJobLinkByOrgId(int pageIndex, int pageSize, int orgId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<JobLink> job = _service.GetJobLinkByOrgId(pageIndex, pageSize, orgId);

                if (job == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("JobLink not found.");
                    return NotFound404(response);
                }
                else
                {
                    response = new ItemResponse<Paged<JobLink>> { Item = job };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("status/active/{id:int}")]
        public ActionResult<SuccessResponse> UpdateJobLinkIsActive(JobLinksUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateJobLinkIsActive(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("status/delete/{id:int}")]
        public ActionResult<SuccessResponse> UpdateJobLinkIsDeleted(JobLinksUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateJobLinkIsDeleted(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
