using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Messages;
using Models.Requests.Messages;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Api.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessageApiController : BaseApiController
    {
        private IMessageService _service = null;
        private IAuthenticationService<int> _authService = null;
        private readonly IHubContext<ChatHub, IChatClients> _chatHub;
        public MessageApiController(IMessageService service,
            ILogger<MessageApiController> logger,
            IAuthenticationService<int> authService, IHubContext<ChatHub, IChatClients> chatHub) : base(logger)
        {
            _service = service;
            _authService = authService;
            _chatHub = chatHub;
        }

        [HttpPost("")]
        public async Task<ActionResult<ItemResponse<int>>> Create(MessageAddRequest model)
        {
            ObjectResult result = null;
            int idCopy = 0;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                idCopy = id;
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse($"Exception Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
                result = StatusCode(500, response);
            }

            MessageModel message = _service.GetById(idCopy);
            string SenderConnectionId = _service.GetConnectionByUserId(message.SenderId);
            string RecipientConnectionId = _service.GetConnectionByUserId(message.RecipientId);

            if (!string.IsNullOrWhiteSpace(SenderConnectionId))
            {
                await _chatHub.Clients.Client(SenderConnectionId).ReceiveMessage(message);
            }
            if (!string.IsNullOrWhiteSpace(RecipientConnectionId))
            {
                await _chatHub.Clients.Client(RecipientConnectionId).ReceiveMessage(message);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(MessageUpdateRequest model)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
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

        [HttpPut("read/{id:int}")]
        public ActionResult<SuccessResponse> UpdateReadStatus(int id)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateReadDate(id, userId);
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<MessageModel>> Get(int id)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                MessageModel msg = _service.GetById(id);
                if (msg == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<MessageModel>() { Item = msg };
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

        [HttpGet("thread/{user2:int}")]
        public ActionResult<ItemResponse<List<MessageModel>>> GetThread(int user2)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                int user1 = _authService.GetCurrentUserId();
                List<MessageModel> msgs = _service.GetUsersThread(user1, user2);
                if (msgs == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<List<MessageModel>>() { Item = msgs };
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


        [HttpGet("")]
        public ActionResult<ItemResponse<Paged<MessageModel>>> GetPaginated(int pageIndex, int pageSize)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<MessageModel> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MessageModel>>() { Item = paged };
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

        [HttpGet("sender")]
        public ActionResult<ItemResponse<Paged<MessageModel>>> GetPaginatedBySenderId(int pageIndex, int pageSize, int senderId)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<MessageModel> paged = _service.PaginationBySenderId(pageIndex, pageSize, senderId);
                if (paged == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MessageModel>>() { Item = paged };
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

        [HttpGet("recipient")]
        public ActionResult<ItemResponse<Paged<MessageModel>>> GetPaginatedByRecipientId(int pageIndex, int pageSize, int recipientId)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<MessageModel> paged = _service.PaginationByRecipientId(pageIndex, pageSize, recipientId);
                if (paged == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MessageModel>>() { Item = paged };
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int sCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
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
    }
}


