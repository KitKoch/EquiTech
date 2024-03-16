using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Comment;
using Models.Requests.Comments;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using SendGrid;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentApiController : BaseApiController
    {
        private ICommentService _service;
        private IAuthenticationService<int> _authService = null;

        public CommentApiController(ICommentService service
            , ILogger<CommentApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet("{entityid:int}/{entityTypeId:int}")]
        public ActionResult<ItemsResponse<Comment>> Get(int entityId, int entityTypeId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<Comment> list = _service.GetNestedComments(entityId, entityTypeId);

                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemsResponse<Comment> { Items = list };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse("Generic Error");
            }
            return StatusCode(iCode, response);
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CommentAddRequest model)
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

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(CommentUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = 0;

            try
            {
                userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);

        }

        [HttpDelete("{id:int}")]
        public ActionResult<ItemResponse<int>> UpdateIsDeleted(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = 0;

            try
            {
                userId = _authService.GetCurrentUserId();
                _service.UpdateIsDeleted(id, userId);
                response = new SuccessResponse();

            }
            catch (Exception ex)
            {

                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }
    }
}
