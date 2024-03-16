using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Data.Providers;
using Models;
using Models.Domain.Venues;
using Models.Requests.Locations;
using Models.Requests.Venues;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/venues")]
    [ApiController]
    public class VenueApiController : BaseApiController
    {
        private IVenuesService _service = null;
        private IAuthenticationService<int> _WebAuthenticationService = null;

        public VenueApiController(IVenuesService venueService,
            ILogger<VenueApiController> logger,
            IAuthenticationService<int> WebAuthenticationService) : base(logger)
        {
            _service = venueService;
            _WebAuthenticationService = WebAuthenticationService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Venue>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Venue aVenue = _service.GetById(id);

                if (aVenue == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<Venue> { Item = aVenue };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("createdby/{id:int}")]
        public ActionResult<ItemResponse<Paged<Venue>>> GetCreatedBy(int pageIndex, int pageSize, int id)
        {
            ActionResult result = null;
            try
            {
                Paged<Venue> paged = _service.GetCreatedBy(pageIndex, pageSize, id);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Venue>> response = new ItemResponse<Paged<Venue>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpPost("")]
        public ActionResult<ItemResponse<int>> Create(VenueAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _WebAuthenticationService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(VenueUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _WebAuthenticationService.GetCurrentUserId();
                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<Venue>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<Venue> paged = _service.GetAllPaginated(pageIndex, pageSize);

                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Venue>> response = new ItemResponse<Paged<Venue>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Venue>>> SearchPagination(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<Venue> paged = _service.SearchPagination(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Venue>> response = new ItemResponse<Paged<Venue>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
    }
}