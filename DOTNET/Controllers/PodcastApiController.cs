using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Net.Security;
using Models.Domain.Podcasts;
using Models.Requests.Podcasts;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/podcasts")]
    [ApiController]
    public class PodcastApiController : BaseApiController
    {
        private IPodcastServices _service = null;
        private IAuthenticationService<int> _authService = null;
        public PodcastApiController(IPodcastServices service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<int>> GetPodcastPaged(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<Podcast> paged = _service.GetPodcastPaged(pageIndex, pageSize);

                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse(("Records not found"));
                }
                else
                {
                    result = new ItemResponse<Paged<Podcast>> { Item = paged };

                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }

        [HttpGet("all")]
        public ActionResult<ItemsResponse<int>> GetAllPodcast()
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                List<Podcast> list = _service.GetAllPodcast();

                if (list == null)
                {
                    code = 404;
                    result = new ErrorResponse(("Records not found"));
                }
                else
                {
                    result = new ItemsResponse<Podcast> { Items = list };

                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<int>> GetPodcastSearch(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<Podcast> paged = _service.GetPodcastSearch(pageIndex, pageSize, query);

                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse(("Records not found"));
                }
                else
                {
                    result = new ItemResponse<Paged<Podcast>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }

        [HttpGet("createdby/{createdby:int}")]
        public ActionResult<ItemResponse<int>> GetPodcastCreatedBy(int pageIndex, int pageSize, int createdby)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<Podcast> paged = _service.GetPodcastCreatedBy(pageIndex, pageSize, createdby);

                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse(("Records not found"));
                }
                else
                {
                    result = new ItemResponse<Paged<Podcast>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> CreatePodcast(PodcastAddRequest model)
        {
            int currentUserId = _authService.GetCurrentUserId();
            ObjectResult result = null;
            try
            {
                int id = _service.AddPodcast(model, currentUserId);
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(PodcastUpdateRequest model, int id)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();
            try
            {
                _service.Update(model, userId, id);
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
    }
}
