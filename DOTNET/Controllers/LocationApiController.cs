
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Data.Providers;
using Models;
using Models.Domain.Locations;
using Models.Requests.Locations;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationApiController : BaseApiController
    {
        private IDataProvider _dataProvider;
        private ILocationService _service = null;
        private IAuthenticationService<int> _authService = null;

        public LocationApiController(IAuthenticationService<int> authService, ILocationService service, IDataProvider dataProvider, ILogger<LocationApiController> logger) : base(logger)
        {
            _service = service;
            _dataProvider = dataProvider;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Location>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Location location = _service.Get(id);

                if (location == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<Location> { Item = location };
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

        [HttpGet("createdby")]
        public ActionResult<ItemResponse<Paged<Location>>> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            ActionResult result = null;
            try
            {
                Paged<Location> paged = _service.GetByCreatedBy(pageIndex, pageSize, createdBy);

                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Location>> response = new ItemResponse<Paged<Location>>();
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

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(LocationAddRequest location)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(location, userId);
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
        public ActionResult<SuccessResponse> Update(LocationUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
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


        [HttpGet("paginated")]
        public ActionResult<ItemResponse<Paged<Location>>> GetPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<Location> paged = _service.GetPaginated(pageIndex, pageSize);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Location>> response = new ItemResponse<Paged<Location>>();
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

        [HttpGet("")]
        public ActionResult<ItemsResponse<Location>> GetAll()
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<Location> locationsList = _service.GetAll();
                if (locationsList == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<Location> { Items = locationsList };
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
    }
}
