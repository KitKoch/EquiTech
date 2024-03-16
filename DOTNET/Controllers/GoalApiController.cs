using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Goals;
using Models.Requests.Goals;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using Stripe;
using System;

namespace Web.Api.Controllers
{
    [Route("api/goals")]
    [ApiController]
    public class GoalApiController : BaseApiController
    {
        private IGoalService _goalService = null;
        private IAuthenticationService<int> _authService = null;

        public GoalApiController(IGoalService goalService
            , ILogger<GoalApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _goalService = goalService;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(GoalAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _goalService.AddGoal(model, userId);
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Goal>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Goal goal = _goalService.Get(id);

                if (goal == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Goal> { Item = goal };
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(GoalUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _goalService.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("completed/{id:int}")]
        public ActionResult<SuccessResponse> UpdateIsCompleted(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _goalService.UpdateIsCompleted(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
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
                _goalService.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("createdby")]
        public ActionResult<ItemResponse<Paged<Goal>>> GetByCreatedBy(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                Paged<Goal> page = _goalService.GetByCreatedBy(userId, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Goal>> { Item = page };
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
        [HttpGet]
        [Authorize(Roles = "OrgAdmin, HiringAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Goal>>> GetAll(bool completed, decimal minPay, decimal maxPay, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Goal> page = _goalService.GetAll(completed, minPay, maxPay, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Goal>> { Item = page };
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
        [HttpGet("search")]
        [Authorize(Roles = "OrgAdmin, HiringAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Goal>>> SearchGoalsByCandidate(bool completed, string query, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Goal> page = _goalService.SearchGoalsByCandidate(completed, query, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Goal>> { Item = page };
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
        [HttpGet("filter")]
        [Authorize(Roles = "OrgAdmin, HiringAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Goal>>> FilterByDesiredPay(string query, bool completed, decimal minPay, decimal maxPay, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                if (query == null)
                {
                    query = string.Empty;
                }
                Paged<Goal> page = _goalService.FilterByDesiredPay(query, completed, minPay, maxPay, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Goal>> { Item = page };
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
