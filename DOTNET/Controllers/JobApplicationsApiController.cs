using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Data.Providers;
using Services.Interfaces;
using Services;
using Web.Controllers;
using Microsoft.Extensions.Logging;
using Models.Requests.Locations;
using Web.Models.Responses;
using System;
using Models.Requests.JobApplications;
using Microsoft.AspNetCore.Authorization;
using Models.Domain.JobApplications;
using Models;

namespace Web.Api.Controllers
{
    [Route("api/jobs/applications")]
    [ApiController]
    public class JobApplicationsApiController : BaseApiController
    {
        private IDataProvider _dataProvider;
        private IJobApplicationsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public JobApplicationsApiController(IAuthenticationService<int> authService, IJobApplicationsService service, IDataProvider dataProvider, ILogger<JobApplicationsApiController> logger) : base(logger)
        {
            _service = service;
            _dataProvider = dataProvider;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<JobApplication>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                JobApplication jobApp = _service.Get(id);

                if (jobApp == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<JobApplication> { Item = jobApp };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(JobApplicationAddRequest jobApplication)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(jobApplication, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(JobApplicationUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("applicationstatus/{id:int}")]
        public ActionResult<SuccessResponse> UpdateIsWithdrawn(int model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateIsWithdrawn(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("candidatestatus/{id:int}")]
        public ActionResult<SuccessResponse> UpdateStatus(JobApplicationUpdateStatusRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateStatus(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("self")]
        public ActionResult<ItemResponse<Paged<JobApplication>>> GetPaginatedByCreatedBy(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                Paged<JobApplication> paged = _service.GetPaginatedByCreatedBy(pageIndex, pageSize, userId);

                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<JobApplication>> response = new ItemResponse<Paged<JobApplication>>();
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

        [HttpGet("jobid")]
        public ActionResult<ItemResponse<Paged<JobApplication>>> GetPaginatedByJobId(int pageIndex, int pageSize, int JobId)
        {
            ActionResult result = null;
            try
            {
                Paged<JobApplication> paged = _service.GetPaginatedByJobId(pageIndex, pageSize, JobId);


                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<JobApplication>> response = new ItemResponse<Paged<JobApplication>>();
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
        [HttpGet("organizationid")]
        public ActionResult<ItemResponse<Paged<JobApplicationV2>>> GetPaginatedByOrgId(int pageIndex, int pageSize, int organizationId)
        {
            ActionResult result = null;
            try
            {
                Paged<JobApplicationV2> paged = _service.GetPaginatedByOrgId(pageIndex, pageSize, organizationId);


                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<JobApplicationV2>> response = new ItemResponse<Paged<JobApplicationV2>>();
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

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<JobApplicationV2>>> SearchJobApplicationsByOrgId(int pageIndex, int pageSize, int organizationId, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<JobApplicationV2> page = _service.SearchJobApplicationsByOrgId(pageIndex, pageSize, organizationId, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<JobApplicationV2>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
    }
}
