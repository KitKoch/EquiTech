
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NuGet.ProjectModel;
using Models;
using Models.Domain.Files;
using Models.Enums;
using Models.Requests;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Core.Configs;
using Web.Models.Responses;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Api.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FileApiController : BaseApiController
    {
        private IFileService _service;
        private ILogger _logger;
        private IAuthenticationService<int> _auth;
        private readonly S3Config _aws;
        public FileApiController(ILogger<FileApiController> logger, IAuthenticationService<int> auth, IFileService fileService, IOptions<S3Config> awsConfig)
            : base(logger)
        {
            _service = fileService;
            _auth = auth;
            _logger = logger;
            _aws = awsConfig.Value;
        }

        [HttpGet()]
        public ActionResult<ItemResponse<Paged<File>>> GetAllPaginated(int pageSize, int pageIndex)
        {
            int code = 200;
            BaseResponse res;
            try
            {
                Paged<File> files = _service.SelectAllPaginated(pageSize, pageIndex);
                if (files == null)
                {
                    code = 404;
                    res = new ErrorResponse("No Record Found.");
                }
                else
                    res = new ItemResponse<Paged<File>> { Item = files };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("createdby")]
        public ActionResult<ItemResponse<Paged<File>>> GetAllCurrentUser(int pageSize, int pageIndex)
        {
            int code = 200;
            BaseResponse res;
            try
            {
                int currentUser = _auth.GetCurrentUserId();
                Paged<File> files = _service.SelectByCreatorPaginated(pageSize, pageIndex, currentUser);
                if (files == null)
                {
                    code = 404;
                    res = new ErrorResponse("No Record Found.");
                }
                else
                    res = new ItemResponse<Paged<File>> { Item = files };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<File>>> SearchFiles(int pageSize, int pageIndex, bool isSorting, int sortingType, bool isAscending, bool isUser, int fileType, string extension = "", string query = "", bool isDeleted = false)
        {
            int code = 200;
            BaseResponse res;
            try
            {
                int currentUser = 0;
                if (isUser)
                {
                    currentUser = _auth.GetCurrentUserId();
                }

                Paged<File> files = _service.SearchFiles(pageSize, pageIndex, query, isSorting, sortingType, isAscending, currentUser, fileType, extension, isDeleted);
                if (files == null)
                {
                    code = 404;
                    res = new ErrorResponse("No Record Found.");
                }
                else
                    res = new ItemResponse<Paged<File>> { Item = files };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpDelete("{fileId:int}")]
        public ActionResult DeleteFile(int fileId)
        {
            int code = 200;
            BaseResponse res;
            try
            {
                _service.DeleteById(fileId);
                res = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpPost("recover/{fileId:int}")]
        public ActionResult RecoverFile(int fileId)
        {
            int code = 200;
            BaseResponse res;
            try
            {
                _service.RecoverById(fileId);
                res = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }


        [HttpPost()]
        public async Task<ActionResult<ItemsResponse<File>>> AddMultipleFile(List<IFormFile> files)
        {
            int code = 201;
            BaseResponse res;
            List<File> fileList = new List<File>();
            int userId = 0;
            userId = _auth.GetCurrentUserId();
            try
            {
                foreach (IFormFile file in files)
                {
                    FileAddRequest fileModel = MapFileToModel(file);
                    fileModel.Url = await _service.UploadNewFile(file, _aws.AccessKey, _aws.Secret, _aws.BucketRegion, _aws.BucketName);
                    File fileResponse = _service.CreateFile(fileModel, userId);
                    fileList.Add(fileResponse);
                }
                res = new ItemsResponse<File> { Items = fileList };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpPost("{id:int}")]
        public ActionResult DownloadFile(int id)
        {
            int code = 201;
            BaseResponse res;
            try
            {
                _service.DownloadFile(id);
                res = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        private FileAddRequest MapFileToModel(IFormFile file)
        {
            if (file.Length > 100000000) throw new FileFormatException("File size over 100mb limit");
            FileAddRequest fileModel = new FileAddRequest();
            fileModel.Name = file.FileName;
            string extension = file.FileName.Split('.')[^1];
            fileModel.FileTypeId = (int)(FileTypes)Enum.Parse(typeof(FileTypes), extension);
            fileModel.FileSize = (int)file.Length;
            return fileModel;
        }


    }
}
