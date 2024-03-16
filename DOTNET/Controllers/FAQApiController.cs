using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Services;
using Web.Models.Responses;
using System.Collections.Generic;
using System.Net;
using System;
using Models.Domain.FAQ;
using Models.Requests.FAQ;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;
using Web.Controllers;
using SendGrid;
using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Web.Api.Controllers
{
    [Route("api/faqs")]
    [ApiController]
    public class FAQApiController : BaseApiController
    {
        private IFAQsService _faqsService = null;
        private IAuthenticationService<int> _webAuthenticationService = null;

        public FAQApiController(IFAQsService service,
            ILogger<FAQApiController> logger,
            IAuthenticationService<int> webAuthenticationService) : base(logger)
        {
            _faqsService = service;

            _webAuthenticationService = webAuthenticationService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(FAQAddRequest model)
        {
            int userId;
            int id;
            ObjectResult result;
            try
            {
                userId = _webAuthenticationService.GetCurrentUserId();
                id = _faqsService.Add(model, userId);

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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(FAQUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _webAuthenticationService.GetCurrentUserId();

                _faqsService.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<ItemsResponse<FAQ>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<FAQ> list = _faqsService.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Address not found.");
                }
                else
                {
                    response = new ItemsResponse<FAQ> { Items = list };
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _faqsService.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpGet("category/{id:int}")]
        public ActionResult<ItemsResponse<FAQ>> GetByCategory(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<FAQ> faq = _faqsService.GetByCategory(id);

                if (faq == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("FAQ not found.");
                    return NotFound(response);
                }
                else
                {
                    response = new ItemsResponse<FAQ> { Items = faq };
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
    }
}
