using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Skills;
using Models.Requests.Skills;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/skills")]
    [ApiController]
    public class SkillApiController : BaseApiController
    {
        private ISkillService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SkillApiController(ISkillService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SkillAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddSkill(model, userId);

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
        public ActionResult<SuccessResponse> UpdateSkill(SkillUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateSkill(model, userId);
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> UpdateSkillIsDeleted(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.DeleteSkill(userId, id);
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

        [HttpPut("approved/{id:int}")]
        public ActionResult<SuccessResponse> UpdateSkillIsApproved(SkillUpdateIsApprovedRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateSkillIsApproved(model, userId);
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
        public ActionResult<ItemResponse<Skill>> SkillGet(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Skill skill = _service.GetSkillById(id);
                if (skill == null)
                {
                    code = 404;
                    response = new ErrorResponse("Skill Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Skill> { Item = skill };
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
        public ActionResult<ItemResponse<Paged<Skill>>> SkillPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Skill> page = _service.GetSkillPaged(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Paged Skill Records Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Skill>> { Item = page };
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

        [HttpGet("industry/{id:int}")]
        public ActionResult<ItemsResponse<Skill>> SkillGetByIndustryId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Skill> list = _service.GetSkillByIndustryId(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Skill Record Associated with This Industry");
                }
                else
                {
                    response = new ItemsResponse<Skill> { Items = list };
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

        [HttpGet]
        public ActionResult<ItemsResponse<BaseSkill>> GetALLSkillsNotDeleted()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<BaseSkill> list = _service.GetALLSkills();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Skill Records Not Found");
                }
                else
                {
                    response = new ItemsResponse<BaseSkill> { Items = list };
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
