using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Blogs;
using Models.Domain.Newsletters;
using Models.Requests.Newsletters;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/newsletters")]
    [ApiController]
    public class NewsletterApiController : BaseApiController
    {
        private INewsletterService _service;
        private IAuthenticationService<int> _auth;
        public NewsletterApiController(INewsletterService service, IAuthenticationService<int> auth, ILogger<NewsletterApiController> logger) : base(logger)
        {
            _service = service;
            _auth = auth;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Paged<Newsletter>>> GetAllPaged(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                Paged<Newsletter> pagedItems = _service.GetAll(pageIndex, pageSize);

                if (pagedItems != null)
                {
                    response = new ItemResponse<Paged<Newsletter>> { Item = pagedItems };
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource Not Found");
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

        [HttpGet("category/{categoryId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<List<Newsletter>>> GetByCategoryId(int categoryId)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                List<Newsletter> list = _service.GetByCategory(categoryId);

                if (list != null)
                {
                    response = new ItemResponse<List<Newsletter>> { Item = list };
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource Not Found");
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

        [HttpGet("paginate/category/{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Newsletter>>> PaginationNewsletterType(int pageIndex, int pageSize, int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Newsletter> newsletterPaged = _service.PaginationNewsletterType(pageIndex, pageSize, id);

                if (newsletterPaged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Newsletter>> { Item = newsletterPaged };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message.ToString());
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(NewsletterAddRequest model)
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
        public ActionResult<SuccessResponse> Update(NewsletterUpdateRequest model)
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