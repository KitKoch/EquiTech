using Microsoft.AspNetCore.Http;
using Models;
using Models.Domain;
using Models.Domain.Files;
using Models.Requests;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IFileService
    {
        File CreateFile(FileAddRequest fileModel, int userId);
        Task<string> UploadNewFile(IFormFile file, string s3key, string s3secret, string s3region, string s3bucket);
        Paged<File> SelectAllPaginated(int pageSize, int pageIndex);
        Paged<File> SelectByCreatorPaginated(int pageSize, int pageIndex, int userId);
        Paged<File> SearchFiles(int pageSize, int pageIndex, string query, bool isSorting, int sortingType, bool isAscending, int userId, int fileType, string extension, bool isDeleted);
        void DeleteById(int fileId);
        void RecoverById(int fileId);
        void DownloadFile(int id);
    }
}
