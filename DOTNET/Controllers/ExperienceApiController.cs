using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using Models.Domain;
using System.Collections.Generic;
using System;

namespace Web.Api.Controllers
{
    [Route("api/experience")]
    [ApiController]
    public class ExperienceApiController : BaseApiController
    {
        private IExperienceService _service;
        private ILookUpService _lookUpService;
        public ExperienceApiController(IExperienceService service,
            ILogger<ExperienceApiController> logger,
            ILookUpService lookUpService) : base(logger)
        {
            _service = service;
            _lookUpService = lookUpService;
        }

        [HttpGet]

        public ActionResult<ItemsResponse<LookUp3Col>> GetAllExperience()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<LookUp3Col> experiences = _service.GetAllExperience();

                if (experiences == null)
                {
                    code = 404;
                    response = new ErrorResponse("Experience Data not Found");
                }
                else
                {
                    response = new ItemsResponse<LookUp3Col> { Items = experiences };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
