using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Data.Providers;
using Services.Interfaces;
using Services;
using Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Web.Models.Responses;
using System;
using Models.Domain.Ratings;
using Models;
using Models.Requests.Locations;
using Models.Requests.Ratings;

namespace Web.Api.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingApiController : BaseApiController
    {
        private IDataProvider _dataProvider;
        private IRatingService _service = null;
        private IAuthenticationService<int> _authService = null;


        public RatingApiController(IAuthenticationService<int> authService, IRatingService service, IDataProvider dataProvider, ILogger<LocationApiController> logger) : base(logger)
        {
            _service = service;
            _dataProvider = dataProvider;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Rating>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Rating rating = _service.Get(id);

                if (rating == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<Rating> { Item = rating };
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
        public ActionResult<ItemResponse<Paged<Rating>>> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            ActionResult result = null;
            try
            {
                Paged<Rating> paged = _service.GetByCreatedBy(pageIndex, pageSize, createdBy);


                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Rating>> response = new ItemResponse<Paged<Rating>>();
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
        public ActionResult<ItemResponse<Paged<Rating>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<Rating> paged = _service.GetAllPaginated(pageIndex, pageSize);


                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Rating>> response = new ItemResponse<Paged<Rating>>();
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
        public ActionResult<ItemResponse<int>> Add(RatingAddRequest location)
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
        public ActionResult<SuccessResponse> Update(RatingUpdateRequest model)
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

        [HttpPut("delete/{id:int}")]
        public ActionResult<SuccessResponse> Delete(RatingUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {

                int userId = _authService.GetCurrentUserId();
                _service.Delete(model, userId);

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

        [HttpGet("entityId")]
        public ActionResult<ItemResponse<Paged<Rating>>> GetByEntityId(int pageIndex, int pageSize, int entityTypeId, int entityId)
        {
            ActionResult result = null;
            try
            {
                Paged<Rating> paged = _service.GetByEntityId(pageIndex, pageSize, entityTypeId, entityId);

                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Rating>> response = new ItemResponse<Paged<Rating>>();
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


        [HttpGet("average")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Rating>> GetAverage(int entityTypeId, int entityId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int average = _service.GetAverage(entityTypeId, entityId);

                if (average == 0)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<int> { Item = average };
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

    }
}
