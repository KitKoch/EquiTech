using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Domain.InviteMembers;
using Models.Requests.InviteMembers;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using SendGrid;
using System;

namespace Web.Api.Controllers
{
    [Route("api/invites")]
    [ApiController]
    public class InviteMemberApiController : BaseApiController
    {
        private IInviteService _service = null;
        private IAuthenticationService<int> _authService = null;

        public InviteMemberApiController(IInviteService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{token}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<InviteMember>> Get(string token)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                InviteMember invite = _service.SelectByToken(token);

                if (invite == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<InviteMember> { Item = invite };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(InviteMembersAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteInviteById(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
