using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Models;
using Models.Domain;
using Models.Domain.SiteReferences;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [AllowAnonymous]
    [Route("api/sitereferences")]
    [ApiController]
    public class SiteReferenceApiController : BaseApiController
    {
        private ISiteReferencesService _service = null;
        private ILookUpService _lookUpService = null;
        private IAuthenticationService<int> _authService = null;
        public SiteReferenceApiController(ISiteReferencesService service,
        ILogger<PingApiController> logger,
        IAuthenticationService<int> authService, ILookUpService lookUpService) : base(logger)

        {
            _service = service;
            _authService = authService;
            _lookUpService = lookUpService;
        }


        [HttpPost("{refTypeId:int}")]
        public ActionResult<ItemResponse<int>> Create(int currentUserId, int refTypeId)
        {
            ObjectResult result = null;
            try
            {

                int id = _service.AddSiteRef(refTypeId, currentUserId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Paged<SiteReference>>> GetSiteRefPaged(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse result = null;
            try
            {
                Paged<SiteReference> paged = _service.SiteRefPaged(pageIndex, pageSize);


                if (paged == null)
                {
                    code = 404;
                    result = new ErrorResponse("Records not found");
                }
                else
                {
                    result = new ItemResponse<Paged<SiteReference>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }

        [HttpGet("chart")]
        public ActionResult<ItemsResponse<List<SiteReferencesData>>> GetChartInfo()
        {
            int code = 200;
            BaseResponse result = null;

            try
            {
                List<SiteReferencesData> chart = _service.GetSiteReferencesData();

                if (chart == null)
                {
                    code = 404;
                    result = new ErrorResponse("Records not found");
                }
                else
                {
                    result = new ItemResponse<List<SiteReferencesData>> { Item = chart };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }

        [HttpGet("chart/dates")]
        public ActionResult<ItemsResponse<List<SiteReferencesData>>> GetChartInfoByDates(DateTime date1, DateTime date2)
        {
            int code = 200;
            BaseResponse result = null;

            try
            {
                List<SiteReferencesData> chart = _service.GetSiteReferencesDataByDate(date1, date2);

                if (chart == null)
                {
                    code = 404;
                    result = new ErrorResponse("No Data is available for these dates.");
                }
                else
                {
                    result = new ItemResponse<List<SiteReferencesData>> { Item = chart };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, result);
        }
    }
}
