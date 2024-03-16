using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Forums;
using Models.Domain.Threads;
using Models.Requests.Forums;
using Models.Requests.Threads;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Web.Api.Controllers
{
    [Route("api/forums")]
    [ApiController]
    public class ForumsApiController : BaseApiController
    {
        private IForumsService _forumsService;
        private IAuthenticationService<int> _authService = null;

        public ForumsApiController(IForumsService forumsService, ILogger<UserApiController> logger, IAuthenticationService<int> authenticationService) : base(logger)
        {
            _forumsService = forumsService;
            _authService = authenticationService;
        }

        #region Forums

        [HttpGet("categories")]
        public ActionResult<ItemsResponse<ForumMain>> GetAllForumMain()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<ForumMain> list = _forumsService.SelectAllForumByCategory();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Forum not found");
                }
                else
                {
                    response = new ItemsResponse<ForumMain> { Items = list };
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
        public ActionResult<ItemResponse<Paged<Forum>>> GetAllForums(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                var forums = _forumsService.GetAllForums(pageIndex, pageSize);
                if (forums == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }

                var itemResponse = new ItemResponse<Paged<Forum>>
                {
                    Item = forums
                };

                return itemResponse;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Forum>> GetForumById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                var forum = _forumsService.GetForumById(id);
                if (forum == null)
                {
                    code = 404;
                    response = new ErrorResponse("Forum not found");
                }

                var itemResponse = new ItemResponse<Forum>
                {
                    Item = forum
                };

                return itemResponse;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> CreateForum(ForumAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _forumsService.CreateForum(model);
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
        public ActionResult<SuccessResponse> UpdateForum(ForumUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _forumsService.UpdateForum(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("delete/{id:int}")]
        public ActionResult<SuccessResponse> DeleteForum(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                var forum = _forumsService.GetForumById(id);
                if (forum == null)
                {
                    code = 404;
                    response = new ErrorResponse("Forum not found.");
                }

                _forumsService.DeleteForum(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        [Route("search")]
        public ActionResult<ItemResponse<Paged<Forum>>> GetForumsBySearchPagination(string query, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Forum> forum = _forumsService.GetForumsBySearchPagination(query, pageIndex, pageSize);

                if (forum == null)
                {
                    response = new ErrorResponse("No forum categories were found.");
                    code = 404;
                }
                else
                {
                    response = new ItemResponse<Paged<Forum>>
                    {
                        Item = forum
                    };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                ErrorResponse errorResponse = new ErrorResponse($"An error occurred while retrieving forum categories: {ex.Message}");
                response = errorResponse;
            }

            return StatusCode(code, response);
        }

        [HttpGet]
        [Route("paginated")]
        public ActionResult<ItemResponse<Paged<Forum>>> GetForumsByCategoryPaginated(int categoryId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Forum> pagedForums = _forumsService.GetForumsByCategoryPaginated(categoryId, pageIndex, pageSize);

                if (pagedForums == null)
                {
                    response = new ErrorResponse("No forums found for the specified category.");
                    code = 404;
                }
                else
                {
                    response = new ItemResponse<Paged<Forum>> { Item = pagedForums };
                };

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                code = 500;
            }
            return StatusCode(code, response);
        }

        #endregion

        #region ThreadsCrud
        [HttpPost("threads")]
        public ActionResult<ItemResponse<int>> CreateThread(ThreadAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int threadId = _forumsService.CreateThread(model);
                ItemResponse<int> itemResponse = new ItemResponse<int> { Item = threadId };
                return itemResponse;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Error creating thread: {ex.Message}");
                code = 500;
            }

            return StatusCode(code, response);
        }

        [HttpPut("threads/delete/{id:int}")]
        public ActionResult<SuccessResponse> DeleteThread(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _forumsService.DeleteThread(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                code = 500;
            }
            return StatusCode(code, response);
        }

        [HttpPut("threads/update/{id:int}")]
        public ActionResult<SuccessResponse> UpdateThread(ThreadUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _forumsService.UpdateThread(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                code = 500;
            }
            return StatusCode(code, response);
        }
        #endregion


        #region GETBYS

        [HttpGet("threads/parent")]
        public ActionResult<ItemResponse<Paged<Thread>>> GetThreadsByParentId(int parentId, int pageSize, int pageIndex)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Thread> threads = _forumsService.GetThreadsByParentId(parentId, pageSize, pageIndex);

                if (threads == null)
                {
                    code = 404;
                    response = new ErrorResponse("No threads found for the specified parent ID");
                }
                else
                {
                    response = new ItemResponse<Paged<Thread>>
                    {
                        Item = threads
                    };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"An error occurred while retrieving threads: {ex.Message}");
            }

            return StatusCode(code, response);
        }

        [HttpGet("threads/{forumId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Thread>> GetThreadsByForumId(int forumId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Thread> threads = _forumsService.GetThreadsByForumId(forumId);
                if (threads == null)
                {
                    code = 404;
                    response = new ErrorResponse("No threads found");
                }
                else
                {
                    response = new ItemsResponse<Thread> { Items = threads };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"An error occurred while retrieving threads: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("threads/createdby/{createdBy:int}")]
        public ActionResult<ItemResponse<Paged<Thread>>> GetThreadsByCreatedBy(int createdBy, int pageSize, int pageIndex)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Thread> threads = _forumsService.GetThreadsByCreatedBy(createdBy, pageSize, pageIndex);
                if (threads == null)
                {
                    code = 404;
                    response = new ErrorResponse("No threads found");
                }
                response = new ItemResponse<Paged<Thread>>
                {
                    Item = threads
                };
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"An error occurred while retrieving threads: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        #endregion
    }
}
