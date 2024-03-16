using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.UserSkills;
using Models.Requests;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/userskills")]
    [ApiController]
    public class UserSkillsApiController : BaseApiController
    {
        private IUserSkillService _service = null;
        private IAuthenticationService<int> _authService = null;

        public UserSkillsApiController(IUserSkillService service, ILogger<UserSkillsApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<UserSkill>> GetAll()
        {
            int code = 200;
            BaseResponse response;
            try
            {
                List<UserSkill> skills = _service.GetAll();
                if (skills == null)
                {
                    code = 404;
                    response = new ErrorResponse("resource not found");
                }
                else
                {
                    response = new ItemsResponse<UserSkill> { Items = skills };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<SuccessResponse> Create(UserSkillsAddRequest model)
        {
            int code = 201;
            BaseResponse response;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Create(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPost("multiple")]
        public ActionResult<ItemResponse<UserSkillsAddRequest>> BulkCreate(List<UserSkillsAddRequest> models)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.CreateBulk(models, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }


        [HttpPut("{skillId:int}")]
        public ActionResult<SuccessResponse> Update(UserSkillsAddRequest model)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
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

        [HttpDelete("{skillId:int}")]
        public ActionResult<SuccessResponse> Delete(int skillId)
        {
            int code = 200;
            BaseResponse response;


            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Delete(userId, skillId);

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

        [HttpGet("{userId:int}")]
        public ActionResult<ItemResponse<Paged<UserSkill>>> GetByUserId(int userId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<UserSkill> skills = _service.GetByUserId(userId, pageIndex, pageSize);
                if (skills == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<UserSkill>> { Item = skills };
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

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<UserSkill>>> GetSearchPagination(string query, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<UserSkill> skills = _service.GetSearchPagination(query, pageIndex, pageSize);
                if (skills == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<UserSkill>> { Item = skills };
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
