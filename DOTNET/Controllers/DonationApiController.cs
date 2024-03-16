using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services;
using Web.Controllers;
using Models.Requests.Comments;
using Web.Models.Responses;
using System;
using Models.Requests.CharitableFunds;
using Models.Domain.Comment;
using System.Collections.Generic;
using Models.Domain.CharitableFunds;
using Models;

namespace Web.Api.Controllers
{
    [Route("api/donation")]
    [ApiController]
    public class DonationApiController : BaseApiController
    {
        private ICharitableServices _service;
        private IAuthenticationService<int> _authService = null;

        public DonationApiController(ICharitableServices service
            , ILogger<DonationApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(DonationAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddDonation(model, userId);
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

        [HttpGet]
        public ActionResult<ItemResponse<List<Donation>>> GetByCharity(int charityId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Donation> list = _service.GetDonationByCharity(charityId);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<List<Donation>> listResponse = new ItemResponse<List<Donation>>() { Item = list };
                    response = listResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("date")]
        public ActionResult<ItemResponse<List<Donation>>> GetByDateRange(DateTime startDate, DateTime endDate)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Donation> list = _service.GetDonationByDateRange(startDate, endDate);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<List<Donation>> listResponse = new ItemResponse<List<Donation>>() { Item = list };
                    response = listResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("user")]
        public ActionResult<ItemResponse<Paged<Donation>>> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Donation> list = _service.GetDonationsByCreatedBy(pageIndex, pageSize, createdBy);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<Paged<Donation>> listResponse = new ItemResponse<Paged<Donation>>() { Item = list };
                    response = listResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
