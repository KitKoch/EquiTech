using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using System.Diagnostics;
using System;
using Services.Interfaces;
using Web.Models.Responses;
using Models.Requests.Emails;
using Models.Domain.Emails;
using Models.Requests.ContactUs;
using Models.AppSettings;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Web.Api.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailSenderController : ControllerBase
    {
        IEmailSenderService _service = null;

        public EmailSenderController(IEmailSenderService service)
        {
            _service = service;
        }

        [HttpPost("test")]
        public ActionResult EmailSender(SendEmailRequest email)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.SmtpEmailMessage(email);
                response = new SuccessResponse();
            }
            catch (Exception e)
            {
                iCode = 500;
                response = new ErrorResponse("Something went wrong while sending the Email: " + e.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpPost("contactus")]
        [AllowAnonymous]
        public ActionResult MessageSender(ContactUsEmailRequest email)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.ContactUsMessage(email);
                response = new SuccessResponse();
            }
            catch (Exception e)
            {
                iCode = 500;
                response = new ErrorResponse("Something went wrong while sending the Email: " + e.Message);
            }
            return StatusCode(iCode, response);
        }



    }
}





