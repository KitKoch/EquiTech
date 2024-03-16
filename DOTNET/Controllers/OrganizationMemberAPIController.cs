using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.OrganizationMembers;
using Models.Requests.InviteMembers;
using Models.Requests.OrganizationMembersRequest;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Web.Api.Controllers
{
    [Route("api/organizations/members")]
    [ApiController]
    public class OrganizationMemberAPIController : BaseApiController
    {
        private IOrganizationMemberService _service = null;
        private IAuthenticationService<int> _authService = null;

        public OrganizationMemberAPIController(IOrganizationMemberService service,
            ILogger<OrganizationMemberAPIController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateOrgMember(OrganizationMemberUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateOrgMember(model);
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
        public ActionResult<ItemResponse<int>> AddOrgMember(OrganizationMemberAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.AddOrgMember(model);
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
        [HttpPost("invite")]
        public ActionResult<ItemResponse<KeyValuePair<string, int>>> InviteOrgMember(InviteMembersAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                var user = _authService.GetCurrentUser();
                int orgId = Int32.Parse(user.OrganizationId.ToString());
                Dictionary<string, int> idKeyPair = _service.InviteOrgMember(model, user.Id, orgId);
                KeyValuePair<string, int> keyPair = idKeyPair.Single();
                ItemResponse<KeyValuePair<string, int>> response = new ItemResponse<KeyValuePair<string, int>>() { Item = keyPair };
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
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<OrganizationMemberV2>>> ByOrgByNameByEmail(int pageIndex, int pageSize, string query = "")
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<OrganizationMemberV2> paged = _service.ByOrgByNameByEmail(pageIndex, pageSize, query);
                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse("Records Not Found");
                }
                else
                {
                    result = new ItemResponse<Paged<OrganizationMemberV2>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                result = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, result);
        }
        [HttpGet("organization/search")]
        public ActionResult<ItemResponse<Paged<OrganizationMemberV2>>> ByOrgId(int pageIndex, int pageSize, int query)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<OrganizationMemberV2> paged = _service.ByOrgId(pageIndex, pageSize, query);
                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse("Records Not Found");
                }
                else
                {
                    result = new ItemResponse<Paged<OrganizationMemberV2>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                result = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, result);
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<OrganizationMember>> GetOrgMember(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                OrganizationMember orgMember = _service.GetOrgMember(id);
                if (orgMember == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<OrganizationMember>()
                    {
                        Item = orgMember
                    };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"GenericError: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
    }
}
