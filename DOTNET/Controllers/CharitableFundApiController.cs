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
    [Route("api/charitablefund")]
    [ApiController]
    public class CharitableFundApiController : BaseApiController
    {
        private ICharitableServices _service;
        private IAuthenticationService<int> _authService = null;

        public CharitableFundApiController(ICharitableServices service
            , ILogger<CharitableFundApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CharitableFundAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddCharitableFund(model, userId);
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

        [HttpPut]
        public ActionResult<SuccessResponse> Update(CharitableFundUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateCharitableFund(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpDelete]
        public ActionResult<SuccessResponse> Delete(CharitableFundDeleteRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteCharitableFund(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<CharitableFund>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<CharitableFund> list = _service.GetAllCharitableFunds(pageIndex, pageSize);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<Paged<CharitableFund>> listResponse = new ItemResponse<Paged<CharitableFund>>() { Item = list };
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

        [HttpGet("{fundId:int}")]
        public ActionResult<ItemResponse<CharitableFund>> GetById(int fundId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                CharitableFund fund = _service.GetFundById(fundId);
                if (fund == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<CharitableFund> itemResponse = new ItemResponse<CharitableFund>() { Item = fund };
                    response = itemResponse;
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
        public ActionResult<ItemResponse<List<CharitableFund>>> GetByCreatedBy(int createdBy)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<CharitableFund> list = _service.GetFundByCreatedBy(createdBy);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<List<CharitableFund>> listResponse = new ItemResponse<List<CharitableFund>>() { Item = list };
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
