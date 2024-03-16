using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain;
using Models.Domain.ShareStorys;
using Models.Requests.Jobs;
using Models.Requests.ShareStorys;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Core.Services;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/shareStory")]
    [ApiController]
    public class ShareStoryApiController : BaseApiController
    {
        private IShareStoryService _shareStoryService = null;
        private IAuthenticationService<int> _authService = null;

        public ShareStoryApiController(IShareStoryService service
            , ILogger<ShareStoryApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _shareStoryService = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ShareStoryAddRequest model)
        {
            int userId;
            int id;
            ObjectResult result;
            try
            {
                userId = _authService.GetCurrentUserId();
                id = _shareStoryService.AddShareStory(model, userId);

                ItemResponse<int> response = new ItemResponse<int>
                {
                    Item = id
                };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse errorResponse = new ErrorResponse(ex.Message);
                result = StatusCode(500, errorResponse);
            }
            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<ShareStory>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                ShareStory story = _shareStoryService.GetById(id);

                if (story == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Story not found");

                    return NotFound404(response);
                }

                else
                {
                    response = new ItemResponse<ShareStory> { Item = story };
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

        [HttpGet("paginate")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<ShareStory>>> GetShareStoryNotApproved(int pageIndex, int pageSize, bool isApproved)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<ShareStory> page = _shareStoryService.GetShareStoryByNotApproved(pageIndex, pageSize, isApproved);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Page not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<ShareStory>> { Item = page };
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ShareStoryUpdate model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _shareStoryService.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {

                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("approval/{id:int}/{isApproved:bool}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> UpdateApproval(int id, bool isApproved)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = 0;

            try
            {
                userId = _authService.GetCurrentUserId();
                _shareStoryService.UpdateApproval(id, isApproved, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {

                code = 500;
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
                _shareStoryService.Delete(id);

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

