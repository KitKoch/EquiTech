using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.CandidateLocations;
using Models.Domain.ShareStorys;
using Models.Requests.CandidateLocationsRequest;
using Models.Requests.Skills;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;


namespace Web.Api.Controllers
{
    [Route("api/candidate/locations")]
    [ApiController]
    public class CandidateLocationApiController : BaseApiController
    {
        private ICandidateLocationServices _service;
        private IAuthenticationService<int> _authService = null;

        public CandidateLocationApiController(ICandidateLocationServices service
            , ILogger<CandidateLocationApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CandidateLocationsAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddCandidateLocation(model, userId);
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

        [HttpPost("form")]
        public ActionResult<ItemResponse<int>> CreateForm(CandidateLocationsFormAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddCandidateLocationForm(model, userId);
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<List<CandidateLocation>>> GetByUserId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<CandidateLocation> candidateLocationList = _service.GetCandidateLocationsByUserId(id);

                if (candidateLocationList == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<List<CandidateLocation>> { Item = candidateLocationList };
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

        [HttpGet("paginate/range")]
        public ActionResult<ItemResponse<Paged<CandidateLocation>>> GetByLocationIdRange(int start, int end, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<CandidateLocation> page = _service.GetCandidateLocationByLocationIdRange(start, end, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Page not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<CandidateLocation>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
        [HttpGet("paginate/geo/range")]
        public ActionResult<ItemResponse<Paged<CandidateLocation>>> GetByGeoLocationIdRange(double lat, double lng, int distance, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<CandidateLocation> page = _service.GetCandidateLocationByGeoLocationIdRange(lat, lng, distance, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Page not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<CandidateLocation>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CandidateLocationsUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateCandidateLocation(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("form/{id:int}")]
        public ActionResult<SuccessResponse> UpdateForm(CandidateLocationsFormUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateCandidateLocationForm(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
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
                _service.DeleteCandidateLocation(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("preferences/{id:int}")]
        public ActionResult<ItemResponse<List<CandidateLocation>>> GetByPreferenceId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<CandidateLocation> candidateLocationList = _service.GetCandidateLocationByPreferenceId(id);

                if (candidateLocationList == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    iCode = 200;
                    response = new ItemResponse<List<CandidateLocation>> { Item = candidateLocationList };
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