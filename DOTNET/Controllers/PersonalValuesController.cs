using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Models.Domain;
using Models.Domain.PersonalValueRankings;
using Models.Domain.PersonalValues;
using Models.Requests.PersonalValueRankings;
using Models.Requests.PersonalValues;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Web.Api.Controllers
{
    [Route("api/personalvalues")]
    [ApiController]
    public class PersonalValuesController : BaseApiController
    {
        private IPersonalValuesService _service = null;
        private IAuthenticationService<int> _authService = null;
        public PersonalValuesController(IPersonalValuesService service
            , ILogger<PersonalValuesController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        #region PersonalValuesRankings

        [HttpGet("rankings")]
        public ActionResult<ItemsResponse<PersonalValueRanking>> GetByUserId()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<PersonalValueRanking> list = _service.Get(userId);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No PersonalValues on record.");
                }
                else
                {
                    response = new ItemsResponse<PersonalValueRanking> { Items = list };
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

        [HttpGet("rankings/average")]
        public ActionResult<ItemsResponse<PersonalValueRankingsAvg>> GetSummary()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<PersonalValueRankingsAvg> list = _service.GetAvg();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No PersonalValues average on record.");
                }
                else
                {
                    response = new ItemsResponse<PersonalValueRankingsAvg> { Items = list };
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

        [HttpPost("rankings")]
        public ActionResult<SuccessResponse> Create(PersonalValueRankingsSortRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Add(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("rankings")]
        public ActionResult<SuccessResponse> Update(PersonalValueRankings model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("rankings/sort")]
        public ActionResult<SuccessResponse> Sort(List<PersonalValueRankingUpdateRequest> model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateSort(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("rankings/{personalValueId:int}")]
        public ActionResult<SuccessResponse> Delete(int personalValueId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Delete(personalValueId, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        #endregion

        #region RelatedPersonalValues

        [Authorize(Roles = "SysAdmin")]
        [HttpPost("related")]
        public ActionResult<SuccessResponse> CreateRelated(RelatedPersonalValuesAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            try
            {
                _service.Add(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("related/{id:int}")]
        public ActionResult<ItemsResponse<RelatedPersonalValues>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<RelatedPersonalValues> list = _service.GetById(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No RelatedPersonalValues on record");
                }
                else
                {
                    response = new ItemsResponse<RelatedPersonalValues> { Items = list };
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

        [HttpGet("related")]
        public ActionResult<ItemsResponse<RelatedPersonalValues>> SelectAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<RelatedPersonalValues> list = _service.SelectAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No RelatedPersonalValues on record");
                }
                else
                {
                    response = new ItemsResponse<RelatedPersonalValues> { Items = list };
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

        [Authorize(Roles = "SysAdmin")]
        [HttpDelete("related/{personalvaluea:int}/{personalvalueb:int}")]
        public ActionResult<SuccessResponse> DeleteRelated(int personalValueA, int personalValueB)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteRelatedPersonalValues(personalValueA, personalValueB);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        #endregion
    }
}
