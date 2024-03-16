using Models;
using Models.Domain.ShareStorys;
using Models.Requests.ShareStorys;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IShareStoryService
    {
        int AddShareStory(ShareStoryAddRequest model, int userId);
        void Update(ShareStoryUpdate model, int userId);

        ShareStory GetById(int id);
        Paged<ShareStory> GetShareStoryByNotApproved(int pageIndex, int pageSize, bool isApproved);
        void Delete(int id);
        void UpdateApproval(int id, bool isApproved, int userId);
    }
}