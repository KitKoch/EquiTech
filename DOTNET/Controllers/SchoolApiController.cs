using Microsoft.Extensions.Logging;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using System;
using Models.Domain.Schools;
using Models.Requests.Schools;
using Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Services.Interfaces;

namespace Web.Api.Controllers
{
    [Route("api/schools")]
    [ApiController]

    public class SchoolApiController : BaseApiController
    {
        private ISchoolService _service = null;
        private IAuthenticationService<int> _authService = null;
        public SchoolApiController(ISchoolService service
            , ILogger<SchoolApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<School>> GetAllSchools()
        {
            int code = 200;
            BaseResponse response;
            try
            {
                List<School> list = _service.GetAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<School> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<School>> GetById(int id)
        {
            int code = 200;
            BaseResponse response;

            try
            {
                School school = _service.GetById(id);

                if (school == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found");
                }
                else
                {
                    response = new ItemResponse<School> { Item = school };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("paged")]
        public ActionResult<ItemResponse<Paged<School>>> SchoolsPaged(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<School> page = _service.GetPaged(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<School>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<School>>> SearchPaged(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<School> page = _service.SearchPaged(pageIndex, pageSize, query);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<School>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost()]
        public ActionResult<ItemResponse<int>> Create(SchoolAddRequest model)
        {
            int code = 201;
            BaseResponse response;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddSchool(model, userId);

                response = new ItemResponse<int>() { Item = id };
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(code, response);

        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(SchoolUpdateRequest model)
        {
            int code = 200;
            BaseResponse response;
            try
            {

                int userId = _authService.GetCurrentUserId();
                _service.UpdateSchool(model, userId);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(code, response);

        }

        [HttpPut("verification/{schoolId:int}")]
        public ActionResult<SuccessResponse> UpdateVerified(int schoolId)
        {
            int code = 200;
            BaseResponse response;
            try
            {

                int userId = _authService.GetCurrentUserId();
                _service.UpdateIsVerified(schoolId, userId);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(code, response);

        }
        [HttpPut("delete/{schoolId:int}")]
        public ActionResult<SuccessResponse> UpdateDeleted(int schoolId)
        {
            int code = 200;
            BaseResponse response;
            try
            {

                int userId = _authService.GetCurrentUserId();
                _service.UpdateIsDeleted(schoolId, userId);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(code, response);

        }

    }
}
