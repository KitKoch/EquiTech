using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Data.Providers;
using Models;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using Models.Requests.Licenses;

namespace Web.Api.Controllers
{
    [Route("api/licenses")]
    [ApiController]
    public class LicenseApiController : BaseApiController
    {
        private IDataProvider _dataProvider;
        private ILicenseServices _service = null;
        private IAuthenticationService<int> _authService = null;

        public LicenseApiController(IAuthenticationService<int> authService, ILicenseServices service, IDataProvider dataProvider, ILogger<LicenseApiController> logger) : base(logger)
        {
            _service = service;
            _dataProvider = dataProvider;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(LicenseAddRequest addRequest)
        {
            ObjectResult result = null;
            try
            {
                int authId = _authService.GetCurrentUserId();
                int id = _service.AddLicense(addRequest, authId);
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
        public ActionResult<SuccessResponse> Update(LicenseUpdateRequest requestModel)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int authId = _authService.GetCurrentUserId();
                _service.Update(requestModel, authId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteLicenseById(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("")]
        public ActionResult<ItemResponse<Paged<License>>> SelectAll(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            ItemResponse<Paged<License>> response = new ItemResponse<Paged<License>>();
            try
            {
                Paged<License> licensesPaged = _service.SelectAllLicenses(pageIndex, pageSize);
                if (licensesPaged == null)
                {
                    result = NotFound404(new ErrorResponse("Licenses not found"));
                }
                else
                {
                    response.Item = licensesPaged;
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

        [HttpGet("createdby/{id:int}")]
        public ActionResult<ItemsResponse<List<License>>> SelectCreatedBy(int id)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                List<License> list = _service.SelectByCreatedById(id);
                if (list != null)
                {
                    response = new ItemResponse<List<License>> { Item = list };
                }
                else
                {
                    response = new ErrorResponse("No Licenses found");
                    code = 404;
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
    }
}
