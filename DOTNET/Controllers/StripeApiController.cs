using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.StripeProducts;
using Models.Requests.Stripe;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/stripe")]
    [ApiController]
    public class StripeApiController : BaseApiController
    {

        private IStripeService _service = null;
        private IAuthenticationService<int> _authService = null;
        public StripeApiController(IStripeService service,
            ILogger<StripeApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<string>> Create()
        {

            ObjectResult result = null;

            try
            {
                // userId will be used in the future
                int userId = _authService.GetCurrentUserId();
                string sessionId = _service.NewSession();
                ItemResponse<string> response = new ItemResponse<string>() { Item = sessionId };

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

        [HttpPost("subscriptions")]
        public ActionResult<ItemResponse<string>> CreateSubCheckout(StripeSubscriptionRequest model)
        {

            ObjectResult result = null;

            try
            {
                // userId will be used in the future
                int userId = _authService.GetCurrentUserId();
                string sessionId = _service.NewSessionSubscription(model);
                ItemResponse<string> response = new ItemResponse<string>() { Item = sessionId };

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

        [HttpPost("subscriptions/new")]
        public ActionResult<ItemResponse<string>> InsertNewSubcription(SubscriptionAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                string Id = _service.AddSubscription(model, userId);
                ItemResponse<string> response = new ItemResponse<string>() { Item = Id };

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

        [HttpPut("subscriptions")]
        public ActionResult<SuccessResponse> UpdateSubscription(StripeSubscriptionRequest model)
        {

            int sCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateSubscription(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                sCode = 500;
                response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(sCode, response);
        }

        [HttpGet("products")]
        public ActionResult<ItemsResponse<List<StripeProduct>>> GetProductSubscriptions()
        {

            int sCode = 200;
            BaseResponse response = null;

            try
            {
                List<StripeProduct> list = _service.GetAllProducts();
                if (list == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<List<StripeProduct>>() { Item = list };
                }
            }
            catch (Exception ex)
            {

                sCode = 500;
                response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(sCode, response);

        }

        [HttpGet("subscriptions")]
        public ActionResult<ItemsResponse<StripeSubscription>> GetSubscriptionBySessionId(string sessionId)
        {

            int sCode = 200;
            BaseResponse response = null;

            try
            {
                StripeSubscription sub = _service.GetSubscriptionBySessionId(sessionId);

                if (sub == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<StripeSubscription>() { Item = sub };
                }
            }
            catch (Exception ex)
            {

                sCode = 500;
                response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(sCode, response);

        }

        [HttpGet("subscriptions/current")]
        public ActionResult<ItemsResponse<StripeSubscription>> GetSubscriptionByUserId()
        {

            int sCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                StripeSubscription sub = _service.GetSubscriptionByUserId(userId);

                if (sub == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<StripeSubscription>() { Item = sub };
                }
            }
            catch (Exception ex)
            {

                sCode = 500;
                response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(sCode, response);

        }

        [HttpGet("subscriptions/{id:int}")]
        public ActionResult<ItemsResponse<StripeSubscription>> GetSubscriptionByRecordId(int id)
        {

            int sCode = 200;
            BaseResponse response = null;

            try
            {
                StripeSubscription sub = _service.GetSubscriptionById(id);

                if (sub == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<StripeSubscription>() { Item = sub };
                }
            }
            catch (Exception ex)
            {

                sCode = 500;
                response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(sCode, response);

        }

        [HttpGet("subscriptions/invoice")]
        public ActionResult<ItemsResponse<Invoice>> GetInvoice(string subscriptionId)
        {

            int sCode = 200;
            BaseResponse response = null;

            try
            {
                Invoice invoice = null;
                if (string.IsNullOrEmpty(subscriptionId))
                {
                    int userId = _authService.GetCurrentUserId();
                    invoice = _service.GetUpcomingInvoiceFromUserId(userId);
                }
                else
                {
                    invoice = _service.GetInvoiceFromSubscription(subscriptionId);
                }


                if (invoice == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<Invoice>() { Item = invoice };
                }
            }
            catch (Exception ex)
            {

                sCode = 500;
                response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(sCode, response);

        }



    }
}
