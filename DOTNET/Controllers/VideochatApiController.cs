using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Data.Providers;
using Services.Interfaces;
using Services;
using Web.Controllers;
using Stripe;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System;
using Models.Domain.Videochat;
using Models.Requests.Videochat;
using Web.Models.Responses;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/videochat")]
    [ApiController]
    public class VideochatApiController : BaseApiController
    {

        private IVideochatService _service = null;
        private IAuthenticationService<int> _authService = null;

        public VideochatApiController(IAuthenticationService<int> authService, IVideochatService service, ILogger<VideochatApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<Room>> CreateVideoChatRoom(RoomAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;
            try
            {
                Room room = await _service.CreateVideoChatRoom(model);

                if (room == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Room not created");
                }
                else if (room.Url == null)
                {
                    iCode = 500;
                    response = new ErrorResponse("Unable to connect to Daily");
                }
                else
                {
                    response = new ItemResponse<Room>() { Item = room };
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


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Meeting>> GetMeetingById(string meetingId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Meeting meeting = _service.GetMeetingById(meetingId).Result;

                if (meeting == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Meeting> { Item = meeting };
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
