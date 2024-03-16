using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Appointment;
using Models.Requests.Appointments;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentApiController : BaseApiController
    {
        private IAppointmentService _service = null;
        private IAuthenticationService<int> _authService = null;

        public AppointmentApiController(IAppointmentService service, ILogger<AppointmentService> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(AppointmentAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddAppointment(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(AppointmentUpdateRequest model)
        {
            BaseResponse response = null;
            int code = 200;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateAppointment(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpPut("confirmation/{id:int}")]
        public ActionResult<SuccessResponse> Update(int id)
        {
            BaseResponse response = null;
            int code = 200;

            try
            {
                _service.UpdateAppointmentConfirmation(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            BaseResponse response = null;
            int code = 200;

            try
            {
                _service.DeleteAppointment(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Appointment>> GetById(int id)
        {
            BaseResponse response = null;
            int code = 200;

            try
            {
                Appointment appointment = _service.GetAppointmentById(id);

                if (appointment == null)
                {
                    code = 404;
                    response = new ErrorResponse("Appointment not found.");
                }
                else
                {
                    response = new ItemResponse<Appointment> { Item = appointment };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }



        [HttpGet("clientId")]
        public ActionResult<ItemResponse<Paged<Appointment>>> GetByClientId(int pageindex, int pageSize, int clientId)
        {
            BaseResponse response = null;

            int code = 200;

            try
            {
                Paged<Appointment> page = _service.GetAppointmentByClientId(pageindex, pageSize, clientId);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Appointment not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Appointment>>() { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("createdById")]
        public ActionResult<ItemResponse<Paged<Appointment>>> GetByCreatedById(int pageindex, int pageSize, int createdById)
        {
            BaseResponse response = null;

            int code = 200;

            try
            {
                Paged<Appointment> page = _service.GetAppointmentByCreatedById(pageindex, pageSize, createdById);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Appointment not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Appointment>>() { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("organizationId")]
        public ActionResult<ItemResponse<Paged<Appointment>>> GetByOrgId(int pageindex, int pageSize, int organizationId)
        {
            BaseResponse response = null;

            int code = 200;

            try
            {
                Paged<Appointment> page = _service.GetAppointmentByOrgId(pageindex, pageSize, organizationId);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Appointment not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Appointment>>() { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
