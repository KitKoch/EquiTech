using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Data;
using Data.Extensions;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Files;
using Models.Requests;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.PortableExecutable;
using System.Reflection;
using System.Threading.Tasks;

namespace Services
{
    public class FileService : IFileService, IFileMapper
    {
        private readonly IDataProvider _provider;
        private readonly IConfiguration _config;
        public FileService(IDataProvider provider, IConfiguration config)
        {
            _provider = provider;
            _config = config;
        }

        public async Task<string> UploadNewFile(IFormFile file, string s3key, string s3secret, string s3region, string s3bucket)
        {
            string key = s3key;
            string secret = s3secret;
            string region = s3region;
            string bucket = s3bucket;

            string fileName = string.Format("userfile_{0}_{1}", System.IO.Path.GetRandomFileName(), file.FileName);

            AmazonS3Client s3Client = new AmazonS3Client(key, secret, RegionEndpoint.USWest2);

            TransferUtility fileTransferUtility = new TransferUtility(s3Client);

            await fileTransferUtility.UploadAsync(file.OpenReadStream(), bucket, fileName);

            return string.Format("https://{0}.s3.{1}.amazonaws.com/{2}", bucket, region, fileName);
        }

        public File CreateFile(FileAddRequest fileModel, int userId)
        {
            string proc = "dbo.Files_InsertV3";
            int id = 0;
            _provider.ExecuteNonQuery(proc, (inputParams) =>
            {
                AddParams(fileModel, inputParams);
                inputParams.AddWithValue("@CreatedBy", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                inputParams.Add(idOut);
            }, (output) =>
            {
                Object outId = output["@Id"].Value;
                int.TryParse(outId.ToString(), out id);
            });
            return GenerateFileResponse(id);
        }

        private File GenerateFileResponse(int id)
        {
            string proc = "dbo.Files_SelectByIdV2";
            File file = null;
            _provider.ExecuteCmd(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@FileId", id);
            }, (reader, dataSet) =>
            {
                file = new File();
                int index = 0;
                file = MapFile(reader, ref index);
            });
            return file;
        }

        public Paged<File> SelectAllPaginated(int pageSize, int pageIndex)
        {
            string proc = "dbo.Files_SelectAll_PaginatedV2";
            int totalCount = 0;
            List<File> files = new List<File>();
            Paged<File> pagedFiles = null;
            _provider.ExecuteCmd(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
            }, (reader, dataSet) =>
            {
                File file = null;
                int index = 0;
                file = MapFile(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                files.Add(file);
            });
            if (files != null)
            {
                pagedFiles = new Paged<File>(files, pageIndex, pageSize, totalCount);
            }
            return pagedFiles;

        }

        public Paged<File> SelectByCreatorPaginated(int pageSize, int pageIndex, int userId)
        {
            string proc = "dbo.Files_SelectByCreatedBy_PaginatedV2";
            int totalCount = 0;
            List<File> files = new List<File>();
            Paged<File> pagedFiles = null;
            _provider.ExecuteCmd(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@UserId", userId);
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
            }, (reader, dataSet) =>
            {
                File file = null;
                int index = 0;
                file = MapFile(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                files.Add(file);
            });
            if (files != null)
            {
                pagedFiles = new Paged<File>(files, pageIndex, pageSize, totalCount);
            }
            return pagedFiles;
        }

        public Paged<File> SearchFiles(int pageSize, int pageIndex, string query, bool isSorting, int sortingType, bool isAscending, int userId, int fileType, string extension, bool isDeleted)
        {
            string proc = "dbo.Files_Search_V2";
            if (isDeleted)
            {
                proc = "dbo.Files_Search_Deleted";
            }
            int totalCount = 0;
            List<File> files = new List<File>();
            Paged<File> pagedFiles = null;
            _provider.ExecuteCmd(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
                inputParams.AddWithValue("@Query", query);
                inputParams.AddWithValue("@IsSorting", isSorting);
                inputParams.AddWithValue("@sortingType", sortingType);
                inputParams.AddWithValue("@isAscending", isAscending);
                inputParams.AddWithValue("@userId", userId);
                inputParams.AddWithValue("@FileType", fileType);
                inputParams.AddWithValue("@Extension", extension);
            }, (reader, dataSet) =>
            {
                File file = null;
                int index = 0;
                file = MapFile(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                files.Add(file);
            });
            if (files != null)
            {
                pagedFiles = new Paged<File>(files, pageIndex, pageSize, totalCount);
            }
            return pagedFiles;
        }

        public void DeleteById(int fileId)
        {
            string proc = "dbo.Files_DeleteByIdV2";
            _provider.ExecuteNonQuery(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@Id", fileId);
            }, (returnParams) =>
            {
            });
        }

        public void RecoverById(int fileId)
        {
            string proc = "dbo.Files_RecoverById";
            _provider.ExecuteNonQuery(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@Id", fileId);
            }, (returnParams) =>
            {
            });
        }

        public void DownloadFile(int id)
        {
            string proc = "dbo.Files_Download";
            _provider.ExecuteNonQuery(proc, (inputParams) =>
            {
                inputParams.AddWithValue("@Id", id);
            }, (returnParams) =>
            {
            });
        }

        public File MapFile(IDataReader reader, ref int index)
        {
            File file = new File();
            file.Id = reader.GetSafeInt32(index++);
            file.Name = reader.GetSafeString(index++);
            file.Url = reader.GetSafeString(index++);
            string fileType = reader.GetString(index++);
            file.FileType = Newtonsoft.Json.JsonConvert.DeserializeObject<LookUp>(fileType);
            file.DateCreated = reader.GetSafeDateTime(index++);
            file.FileSize = reader.GetSafeInt32(index++);
            file.Downloaded = reader.GetSafeInt32(index++);
            return file;
        }

        private static void AddParams(FileAddRequest fileModel, SqlParameterCollection inputParams)
        {
            inputParams.AddWithValue("@Name", fileModel.Name);
            inputParams.AddWithValue("@Url", fileModel.Url);
            inputParams.AddWithValue("@FileTypeId", fileModel.FileTypeId);
            inputParams.AddWithValue("@FileSize", fileModel.FileSize);
        }
    }
}
