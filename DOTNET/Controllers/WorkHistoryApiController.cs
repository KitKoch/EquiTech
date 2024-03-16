using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.NewsletterSubscriptions;
using Models.Domain.UsersEducationLevels;
using Models.Domain.WorkHistory;
using Models.Requests.NewsletterSubscriptions;
using Models.Requests.WorkHistory;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using Web.StartUp;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/workhistory")]
    [ApiController]
    public class WorkHistoryApiController : BaseApiController
    {
        private IWorkHistoryService _service;
        private IAuthenticationService<int> _authService = null;

        public WorkHistoryApiController(IWorkHistoryService service, IAuthenticationService<int> authService, ILogger<UserEducationApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost()]
        public ActionResult<ItemResponse<int>> AddWorkHistory(WorkHistoryAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();
            try
            {
                int id = _service.AddWorkHistory(model, userId);
                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id };
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Unable to Create this Work History Record.");
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Unable to Add Work History Record: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateWorkHistory(WorkHistoryUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateWorkHistory(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Unable to Update Work History Record: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteWorkHistory(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteWorkHistory(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Unable to Delete Work History Record: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<WorkHistory>> GetWorkHistoryById(int id)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                WorkHistory workHistory = _service.GetWorkHistoryById(id);
                if (workHistory != null)
                {
                    response = new ItemResponse<WorkHistory> { Item = workHistory };
                }
                else
                {
                    response = new ErrorResponse("No Work History Record Found");
                    code = 404;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Unable to retrieve Work History record: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet()]
        public ActionResult<ItemsResponse<Paged<WorkHistory>>> GetWorkHistoryByUserId(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                int userId = _authService.GetCurrentUserId();
                Paged<WorkHistory> page = _service.GetWorkHistoryByUserId(userId, pageIndex, pageSize);
                if (page != null)
                {
                    response = new ItemResponse<Paged<WorkHistory>> { Item = page };
                }
                else
                {
                    response = new ErrorResponse($"No Work History Records Found...{userId}");
                    code = 404;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Unable to retrieve Work History records: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpPost("position")]
        public ActionResult<ItemResponse<int>> AddWorkPosition(WorkPositionAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();
            try
            {
                int id = _service.AddWorkPosition(model, userId);
                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id };
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Unable to Create Work Position Record.");
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Unable to create Work Position record: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPut("position/{id:int}")]
        public ActionResult<SuccessResponse> UpdateWorkPosition(WorkPositionUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateWorkPosition(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Unable to Update Work Position Record: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpDelete("position/{id:int}")]
        public ActionResult<SuccessResponse> DeleteWorkPosition(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteWorkPosition(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Unable to delete Work Position record: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("position/{id:int}")]
        public ActionResult<ItemResponse<WorkPosition>> GetWorkPositionById(int id)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                WorkPosition workPosition = _service.GetWorkPositionById(id);
                if (workPosition != null)
                {
                    response = new ItemResponse<WorkPosition> { Item = workPosition };
                }
                else
                {
                    response = new ErrorResponse("No Work Position Record Found");
                    code = 404;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Unable to retrieve Work Position record: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("positions/{workHistoryId:int}")]
        public ActionResult<ItemsResponse<List<WorkPosition>>> GetWorkPositionByWorkHistoryId(int workHistoryId)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                List<WorkPosition> list = _service.GetWorkPositionByWorkHistoryId(workHistoryId);
                if (list != null)
                {
                    response = new ItemResponse<List<WorkPosition>> { Item = list };
                }
                else
                {
                    response = new ErrorResponse("No Work Position Records Found");
                    code = 404;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Unable to retrieve Work Position records: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

    }
}
