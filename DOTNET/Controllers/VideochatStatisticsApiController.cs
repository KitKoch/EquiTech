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
using Models.Domain.Videochat;
using Models;
using Models.Requests.Locations;
using Models.Requests.Videochat;

namespace Web.Api.Controllers
{
    [Route("api/videochatstatistics")]
    [ApiController]
    public class VideochatStatisticsApiController : BaseApiController
    {
        private IDataProvider _dataProvider;
        private IVideochatStatisticsService _service = null;
        private IAuthenticationService<int> _authService = null;


        public VideochatStatisticsApiController(IAuthenticationService<int> authService, IVideochatStatisticsService service, IDataProvider dataProvider, ILogger<LocationApiController> logger) : base(logger)
        {
            _service = service;
            _dataProvider = dataProvider;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Statistics>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Statistics statistics = _service.Get(id);

                if (statistics == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<Statistics> { Item = statistics };
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
        public ActionResult<ItemResponse<Paged<Statistics>>> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            ActionResult result = null;
            try
            {
                Paged<Statistics> paged = _service.GetByCreatedBy(pageIndex, pageSize, createdBy);

                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Statistics>> response = new ItemResponse<Paged<Statistics>>();
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
        public ActionResult<ItemResponse<Paged<Statistics>>> GetPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<Statistics> paged = _service.GetPaginated(pageIndex, pageSize);


                if (paged == null)
                {

                    result = NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemResponse<Paged<Statistics>> response = new ItemResponse<Paged<Statistics>>();
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
        public ActionResult<ItemResponse<int>> Add(StatisticsAddRequest statistics)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.Add(statistics);
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
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpPost("participants")]
        public ActionResult<ItemResponse<int>> AddParticipants(MeetingParticipantsAddRequest statistics)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.AddParticipants(statistics);
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

    }
}
