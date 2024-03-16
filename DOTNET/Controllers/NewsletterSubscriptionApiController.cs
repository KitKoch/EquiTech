using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.NewsletterSubscriptions;
using Models.Requests.NewsletterSubscriptions;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using Web.StartUp;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/newslettersubscriptions")]
    [ApiController]
    public class NewsletterSubscriptionApiController : BaseApiController
    {
        private INewsletterSubscriptionService _service;

        public NewsletterSubscriptionApiController(INewsletterSubscriptionService service
            , ILogger<NewsletterSubscriptionApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost()]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Add(NewsletterSubscriptionAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                _service.AddNewsletterSubscription(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut()]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Edit(NewsletterSubscriptionAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateNewsletterSubscription(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }

            return StatusCode(code, response);
        }

        [HttpGet("email")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<NewsletterSubscription>> GetByEmail(string email)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                NewsletterSubscription newsletterSubscription = _service.GetSubscriptionByEmail(email);

                if (newsletterSubscription == null)
                {
                    code = 404;
                    response = new ErrorResponse("Subscription data was not found for the searched email.");
                }
                else
                {
                    response = new ItemResponse<NewsletterSubscription> { Item = newsletterSubscription };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }

            return StatusCode(code, response);
        }

        [HttpGet()]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetPaginated(int filterMode, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<NewsletterSubscription> paged = _service.GetAllNewsletterSubscriptions(filterMode, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Subscription data not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("subscribers")]
        public ActionResult<ItemsResponse<string>> GetSubscribers()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<string> list = _service.GetSubscriberEmails();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Subscriber data not found.");
                }
                else
                {
                    response = new ItemsResponse<string> { Items = list };
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }

            return StatusCode(code, response);
        }

    }
}
