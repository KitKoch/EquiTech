using Microsoft.AspNetCore.Mvc;
using Models.Domain.UsersEducationLevels;
using Models.Requests.UsersEducationLevels;
using Services.Interfaces;
using Web.Models.Responses;
using System.Collections.Generic;
using System;
using Services;
using Web.Controllers;
using Microsoft.Extensions.Logging;
using Models;

namespace Web.Api.Controllers
{
    [Route("api/users/education")]
    [ApiController]
    public class UserEducationApiController : BaseApiController
    {
        private IUserEducationService _service;
        private IAuthenticationService<int> _authService = null;
        public UserEducationApiController(IUserEducationService service, IAuthenticationService<int> authService, ILogger<UserEducationApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<UserEducation>> GetSingleRecord(int id)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                UserEducation userEducation = _service.GetById(id);
                if (userEducation != null)
                {
                    response = new ItemResponse<UserEducation> { Item = userEducation };
                }
                else
                {
                    response = new ErrorResponse("No Records Found");
                    iCode = 404;
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("records/{userId:int}")]
        public ActionResult<ItemsResponse<List<UserEducation>>> GetUserRecords(int userId)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                List<UserEducation> list = _service.GetByUserId(userId);
                if (list != null)
                {
                    response = new ItemResponse<List<UserEducation>> { Item = list };
                }
                else
                {
                    response = new ErrorResponse("No Records Found");
                    iCode = 404;
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemsResponse<Paged<UserEducation>>> GetPagedCreatedBy(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                int userId = _authService.GetCurrentUserId();
                Paged<UserEducation> page = _service.GetPagedByCreatedBy(userId, pageIndex, pageSize);
                if (page != null)
                {
                    response = new ItemResponse<Paged<UserEducation>> { Item = page };
                }
                else
                {
                    response = new ErrorResponse("No Records Found");
                    iCode = 404;
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(UserEducationAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;

            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _service.Add(model, userId);

                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id };
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("Unable to Create this Users Education Record.");
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPost("multipledegrees")]
        public ActionResult<ItemResponse<int>> CreateWithDegrees(UserEducationAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;

            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _service.AddWithDegrees(model, userId);

                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id };
                }
                else
                {
                    iCode = 500;
                    response = new ErrorResponse("Unable to Create this Users Education Record.");
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserEducationUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Unnable to Update that User Education Record: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> UpdateToDeleted(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            int userId = _authService.GetCurrentUserId();

            try
            {
                _service.Delete(id, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Something went wrongh while Deleting V3: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }
    }
}
