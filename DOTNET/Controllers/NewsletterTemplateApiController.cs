using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Newsletters;
using Models.Requests.Newsletters;
using Models.Requests.NewsletterTemplates;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/newsletters/templates")]
    [ApiController]
    public class NewsletterTemplateApiController : BaseApiController
    {
        private INewsletterTemplateService _service;
        private IAuthenticationService<int> _authService;
        public NewsletterTemplateApiController(INewsletterTemplateService service, IAuthenticationService<int> auth, ILogger<NewsletterTemplateApiController> logger) : base(logger)
        {
            _service = service;
            _authService = auth;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<NewsletterTemplate>>> GetAllPaged(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterTemplate> pagedItems = _service.GetAll(pageIndex, pageSize);

                if (pagedItems != null)
                {
                    response = new ItemResponse<Paged<NewsletterTemplate>> { Item = pagedItems };
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
        public ActionResult<ItemResponse<int>> Create(NewsletterTemplateAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);

                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id };
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(NewsletterTemplateUpdateRequest model)
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
