using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Web.Models.Responses;
using System.Collections.Generic;
using System;
using Models.Requests.UsersEducationLevels;
using Models.Domain;
using.Services;
using Microsoft.Extensions.Logging;
using Web.Controllers;

namespace Web.Api.Controllers
{
    [Route("api/degrees")]
    [ApiController]
    public class DegreeApiController : BaseApiController
    {
        private IDegreeService _service;
        public DegreeApiController(IDegreeService service, ILogger<DegreeApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult Create(List<string> model)
        {
            int iCode = 201;
            BaseResponse response = null;

            try
            {
                _service.BatchInsert(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }
    }
}
