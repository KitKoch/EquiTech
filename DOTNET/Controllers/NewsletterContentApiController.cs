using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Domain.Newsletters;
using Models.Requests.NewsletterContents;
using Models.Requests.Newsletters;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/newsletters/content")]
    [ApiController]
    public class NewsletterContentApiController : BaseApiController
    {
        private INewsletterContentService _service;
        private IAuthenticationService<int> _auth;
        public NewsletterContentApiController(INewsletterContentService service, IAuthenticationService<int> auth, ILogger<NewsletterContentApiController> logger) : base(logger)
        {
            _service = service;
            _auth = auth;
        }

        [HttpGet("{newsletterId:int}")]
        public ActionResult<ItemsResponse<List<NewsletterContent>>> GetByNewsletterId(int newsletterId)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                List<NewsletterContent> list = _service.GetByNewsletter(newsletterId);

                if (list != null)
                {
                    response = new ItemResponse<List<NewsletterContent>> { Item = list };
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resourse Not Found");
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(NewsletterContentAddRequest model)
        {
            int iCode = 201;
            BaseResponse response;

            try
            {
                int userId = _auth.GetCurrentUserId();
                int id = _service.Add(model, userId);

                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id };
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("There's been a problem");
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(NewsletterContentUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }
    }
}