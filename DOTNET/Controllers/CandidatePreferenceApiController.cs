using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.CandidatePreferences;
using Models.Requests.CandidatePreferencesRequest;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/candidatepreference")]
    [ApiController]
    public class CandidatePrefernceApiController : BaseApiController
    {
        private ICandidatePreferenceServices _service;
        private IAuthenticationService<int> _authService = null;

        public CandidatePrefernceApiController(ICandidatePreferenceServices service
            , ILogger<CharitableFundApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CandidatePreferencesAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
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
        public ActionResult<SuccessResponse> Update(CandidatePreferencesUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);
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
        public ActionResult<SuccessResponse> Delete(CandidatePreferencesDeleteRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(model);
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
        public ActionResult<ItemResponse<CandidatePreference>> GetByUserId(int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                CandidatePreference candidatePrefernces = _service.GetByUserId(userId);
                if (candidatePrefernces == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<CandidatePreference> itemResponse = new ItemResponse<CandidatePreference>() { Item = candidatePrefernces };
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

        [HttpGet("{preferencesId:int}")]
        public ActionResult<ItemResponse<CandidatePreference>> GetById(int preferencesId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                CandidatePreference candidatePrefernces = _service.GetById(preferencesId);
                if (candidatePrefernces == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<CandidatePreference> itemResponse = new ItemResponse<CandidatePreference>() { Item = candidatePrefernces };
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
    }
}
