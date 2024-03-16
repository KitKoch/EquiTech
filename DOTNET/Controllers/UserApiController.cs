//using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using NuGet.Common;
using Models;
using Models.Domain.Emails;
using Models.Domain.Users;
using Models.Requests.Emails;
using Models.Requests.Users;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using SendGrid.Helpers.Mail;
using Stripe;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserService _userService = null;
        private IAuthenticationService<int> _authService = null;
        private IEmailSenderService _emailSenderService = null;
        public UserApiController(IUserService service, IEmailSenderService emailService, ILogger<UserApiController> logger, IAuthenticationService<int> authenticationService) : base(logger)
        {
            _userService = service;
            _authService = authenticationService;
            _emailSenderService = emailService;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<int>> Create(UserAddRequest model)
        {
            ObjectResult result = null;
            string token = null;
            int tokenType = 1;

            try
            {
                token = Guid.NewGuid().ToString();
                int id = _userService.Create(model);
                _userService.AddUserToken(token, id, tokenType);
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

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<SuccessResponse>> UserLogin(LoginRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            bool isValid = false;

            try
            {
                isValid = await _userService.LogInAsync(model);

                if (isValid)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Either the email or the password do not match");
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<IUserAuthData>> GetCurrent()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                IUserAuthData user = _authService.GetCurrentUser();

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("No current user found");
                }
                else
                {
                    response = new ItemResponse<IUserAuthData> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("current/user")]
        public ActionResult<ItemResponse<User>> GetCurrentUserObj()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                User user = _userService.GetById(userId);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("No current user found");
                }
                else
                {
                    response = new ItemResponse<User> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("forgot")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<string>> ForgotPassword(SendEmailRequest model)
        {
            ObjectResult result = null;
            try
            {

                if (Regex.IsMatch(model.To.Email, "(.*[a-z0-9])[@](.*[a-z])[.][a-z]"))
                {
                    string token = _userService.ForgotPassword(model.To.Email);

                    if (token == "")
                    {
                        result = StatusCode(404, new ErrorResponse("Password change token was not found"));
                    }
                    else
                    {
                        _emailSenderService.SendChangePasswordEmail(model, token);
                        result = StatusCode(200, new ItemResponse<string> { Item = "Email was sent to user" });
                    }
                }
                else
                {
                    result = StatusCode(404, new ErrorResponse($"Incorrect email"));
                }
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse($"Server Error {ex.Message}"));
            }
            return result;
        }

        [HttpPut("changepassword")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> ChangeUserPassword(ChangePasswordRequest model)
        {
            ObjectResult result = null;
            try
            {
                _userService.ChangeUserPassword(model);
                result = StatusCode(200, new SuccessResponse());
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse($"Server Error {ex.Message}"));
            }


            return result;
        }

        [HttpGet("logout")]
        public async Task<ActionResult<SuccessResponse>> LogoutAsync()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                await _authService.LogOutAsync();
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<User>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                User user = _userService.GetById(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<User>() { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("candidates")]
        public ActionResult<ItemsResponse<User>> GetAllCandidates()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<User> list = _userService.GetAllCandidates();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemsResponse<User>() { Items = list };
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

        [HttpGet("candidates/paginate")]
        [Authorize(Roles = "OrgAdmin, HiringAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<User>>> GetAllCandidatesPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> paged = _userService.GetAllCandidatesPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<Paged<User>> pagedResponse = new ItemResponse<Paged<User>>() { Item = paged };
                    response = pagedResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("status/{statusId:int}")]
        public ActionResult<ItemResponse<Paged<User>>> GetByStatus(int statusId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> paged = _userService.GetByStatus(statusId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<Paged<User>> pagedResponse = new ItemResponse<Paged<User>>() { Item = paged };
                    response = pagedResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<User>>> GetPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> paged = _userService.GetPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<Paged<User>> pagedResponse = new ItemResponse<Paged<User>>() { Item = paged };
                    response = pagedResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("related")]
        public ActionResult<ItemResponse<List<User>>> GetRelated()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<User> list = _userService.SelectRelated(userId);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<List<User>> res = new ItemResponse<List<User>>() { Item = list };
                    response = res;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<User>>> SearchPaginated(string query, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> paged = _userService.SearchPaginated(query, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    ItemResponse<Paged<User>> pagedResponse = new ItemResponse<Paged<User>>() { Item = paged };
                    response = pagedResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("status/search")]
        public ActionResult<ItemResponse<Paged<User>>> SearchWithStatusPaginated(string query, int statusId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> paged = _userService.SearchWithStatusPaginated(query, statusId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Matching Records Found");
                }
                else
                {
                    ItemResponse<Paged<User>> pagedResponse = new ItemResponse<Paged<User>>() { Item = paged };
                    response = pagedResponse;
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("confirm")]
        public ActionResult<SuccessResponse> UserConfirm(int userId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _userService.ConfirmUser(userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("status")]
        public ActionResult<SuccessResponse> UpdateUserStatus(int userId, int statusId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _userService.UpdateUserStatus(userId, statusId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("visability")]
        public ActionResult<SuccessResponse> UpdateUserVisability(int userId, bool visible)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _userService.UpdateUserProfileVisability(userId, visible);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("avatar")]
        public ActionResult<SuccessResponse> UpdateUserAvatar(int userId, string avatarUrl)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _userService.UpdateUserAvatar(userId, avatarUrl);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateById(UserUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _userService.UpdateById(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("password/edit")]
        public ActionResult<SuccessResponse> ChangePassword(ChangePasswordRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                _userService.ChangePassword(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

    }
}
