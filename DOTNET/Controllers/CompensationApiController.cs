using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.Blogs;
using Models.Domain.Compensations;
using Models.Domain.CompensationTypeLabels;
using Models.Requests;
using Models.Requests.Blogs;
using Models.Requests.Compensations;
using Models.Requests.CompensationType;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using SendGrid;
using System;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/compensations")]
    [ApiController]
    public class CompensationApiController : BaseApiController
    {
        private ICompensationService _service = null;
        private IAuthenticationService<int> _authService = null;
        public CompensationApiController(ICompensationService service,
            ILogger<CompensationApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        #region Elements

        [HttpGet("elements/{id:int}")]
        public ActionResult<ItemResponse<CompensationElement>> GetByElementId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                CompensationElement element = _service.SelectByElementId(id);

                if (element == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<CompensationElement> { Item = element };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("elements/packages/{compPackageId:int}")]
        public ActionResult<ItemResponse<CompensationElement>> GetByCompPackageId(int compPackageId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<CompensationElement> elements = _service.SelectByCompPackageId(compPackageId);

                if (elements == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<CompensationElement> { Items = elements };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpPost("elements")]
        public ActionResult<ItemResponse<int>> CreateElement(CompensationElementAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.AddElement(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("elements/{id:int}")]
        public ActionResult<SuccessResponse> UpdateElement(CompensationElementUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateElement(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("elements/{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteElement(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost("elements/multiple")]
        public ActionResult<ItemResponse<CompensationElementAddRequest>> BulkCreate(List<CompensationElementAddRequest> models)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.BatchElementInsert(models, userId);
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

        [HttpDelete("elements/package/{id:int}")]
        public ActionResult<SuccessResponse> DeleteByPackageId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteElementsByPackageId(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        #endregion

        #region Packages
        [HttpPost("packages")]
        [Authorize(Roles = "HiringAdmin,OrgAdmin")]
        public ActionResult<ItemResponse<int>> CreatePackage(CompensationPackageAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddPackage(model, userId);
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

        [HttpGet("packages/{id:int}")]
        public ActionResult<ItemResponse<CompensationPackage>> GetByPackageId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                CompensationPackage package = _service.SelectByPackageId(id);

                if (package == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<CompensationPackage> { Item = package };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("packages/{id:int}")]
        [Authorize(Roles = "HiringAdmin,OrgAdmin")]
        public ActionResult<SuccessResponse> UpdatePackage(CompensationPackageUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdatePackage(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("packages/paginated")]
        public ActionResult<ItemResponse<Paged<CompensationPackage>>> GetByOrgIdPaged(int pageIndex, int pageSize, int orgId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<CompensationPackage> paged = _service.SelectByOrgIdPaged(pageIndex, pageSize, orgId);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<CompensationPackage>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message.ToString());
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("packages/softDelete/{id:int}")]
        [Authorize(Roles = "HiringAdmin,OrgAdmin")]
        public ActionResult<SuccessResponse> SoftDelete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.SoftDelete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("packages/{id:int}")]
        [Authorize(Roles = "HiringAdmin,OrgAdmin")]
        public ActionResult<SuccessResponse> DeletePackage(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeletePackage(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        #endregion

        #region Job Compensation
        [HttpPost("jobcompensation")]
        [Authorize(Roles = "HiringAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<int>> CreateJobCompensation(JobCompensationAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.AddJobCompensation(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpGet("jobcompensation/{id:int}")]
        public ActionResult<ItemResponse<JobCompensation>> GetJobCompensation(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<JobCompensation> list = _service.SelectByJobId(id);

                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<JobCompensation> { Items = list };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("jobcompensation/{jobId:int}/{compId:int}")]
        public ActionResult<ItemResponse<JobCompensation>> GetJobandCompId(int jobId, int compId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                JobCompensation jobCompensation = _service.SelectByJobandCompId(jobId, compId);

                if (jobCompensation == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<JobCompensation> { Item = jobCompensation };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("jobcompensation/{jobId:int}/{compId:int}")]
        public ActionResult<ItemResponse<int>> Update(JobCompensationUpdateRequest model, int jobId, int compId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateJobCompensation(model, jobId, compId, userId);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(code, response);
        }

        [HttpDelete("jobcompensation/{jobId:int}/{compId:int}")]
        public ActionResult<SuccessResponse> JobsCompensationDelete(int jobId, int compId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.JobsCompensationDelete(jobId, compId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        #endregion

        #region Configuration(TypeLabel)

        [HttpGet("configuration/{id:int}")]
        public ActionResult<ItemResponse<CompensationTypeLabel>> Get(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                CompensationTypeLabel compensationType = _service.Get(id);

                if (compensationType == null)
                {
                    code = 404;
                    response = new ErrorResponse("Data not found.");
                }
                else
                {
                    response = new ItemResponse<CompensationTypeLabel> { Item = compensationType };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"GenericException Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("configuration/filtered")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<CompensationTypeLabel>> GetAllFiltered()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<CompensationTypeLabel> list = _service.GetAllFiltered();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<CompensationTypeLabel> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"GenericException Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }

        [HttpGet("configuration/unfiltered")]
        public ActionResult<ItemsResponse<CompensationTypeLabel>> GetAllUnfiltered()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<CompensationTypeLabel> list = _service.GetAllUnfiltered();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<CompensationTypeLabel> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"GenericException Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }

        [HttpPost("configuration")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> Post(CompensationTypeAddDeleteRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Post(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("configuration")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> Delete(CompensationTypeAddDeleteRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("configuration/{typeId:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> DeleteByTypeId(int typeId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteByTypeId(typeId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("configuration")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> Update(CompensationTypeAddDeleteRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        #endregion
    }
}
