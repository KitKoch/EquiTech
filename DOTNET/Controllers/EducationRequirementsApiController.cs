using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Domain.EducationRequirements;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Models.Requests.EduReqRequests;
using Models;

namespace Web.Api.Controllers
{
    [Route("api/requirements/education")]
    [ApiController]
    public class EducationRequirementsApiController : BaseApiController
    {
        private IEducationRequirementsService _service = null;
        private IAuthenticationService<int> _authService = null;
        public EducationRequirementsApiController(IEducationRequirementsService service,
        ILogger<PingApiController> logger,
        IAuthenticationService<int> authService) : base(logger)

        {
            _service = service;
            _authService = authService;

        }
        [HttpDelete("{id:int}/job")]
        public ActionResult<SuccessResponse> DeleteJobEduReq(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteJobEduReq(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(code, response);
        }
        [HttpPut("{id:int}/job")]
        public ActionResult<SuccessResponse> UpdateJobEduReq(EduReqRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {

                _service.UpdateJobEduReq(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpPost("job")]
        public ActionResult<ItemResponse<int>> CreateJobEduReq(EduReqRequest model)
        {
            int currentUserId = _authService.GetCurrentUserId();
            ObjectResult result = null;
            try
            {
                int id = _service.AddJobEduReq(model, currentUserId);
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
        [HttpGet("{id:int}/job")]
        public ActionResult<ItemsResponse<JobEduReq>> GetByJobId(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {

                List<JobEduReq> list = _service.GetByJobId(id);


                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<JobEduReq> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }
        [HttpGet("{id:int}/edu")]
        public ActionResult<ItemsResponse<Paged<JobEduReq>>> GetByEduReqId(int id, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<JobEduReq> paged = _service.GetByEduReqId(id, pageIndex, pageSize);


                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse(("Records not found"));
                }
                else
                {
                    result = new ItemResponse<Paged<JobEduReq>> { Item = paged };

                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }

            return StatusCode(code, result);

        }
        [HttpGet("{id:int}/org")]
        public ActionResult<ItemsResponse<Paged<JobEduReq>>> GetByOrgId(int id, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<JobEduReq> paged = _service.GetByOrgId(id, pageIndex, pageSize);


                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse(("Records not found"));
                }
                else
                {
                    result = new ItemResponse<Paged<JobEduReq>> { Item = paged };

                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }

            return StatusCode(code, result);

        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(EduReqUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int currentUserId = _authService.GetCurrentUserId();
            try
            {

                _service.Update(model, currentUserId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("delete/{id:int}")]
        public ActionResult<SuccessResponse> UpdateIsDeleted(int id)
        {
            int code = 200;
            BaseResponse response = null;
            int currentUserId = _authService.GetCurrentUserId();
            try
            {

                _service.UpdateIsDeleted(id, currentUserId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(EduReqAddRequest model)
        {
            int currentUserId = _authService.GetCurrentUserId();
            ObjectResult result = null;
            try
            {
                int id = _service.Add(model, currentUserId);
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
        [HttpGet]
        public ActionResult<ItemsResponse<EducationRequirement>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {

                List<EducationRequirement> list = _service.GetAll();


                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<EducationRequirement> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<EducationRequirement>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                EducationRequirement edReq = _service.GetById(id);

                if (edReq == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    response = new ItemResponse<EducationRequirement> { Item = edReq };
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
    }
}
