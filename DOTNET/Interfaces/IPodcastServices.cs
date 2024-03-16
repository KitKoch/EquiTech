using Models;
using Models.Domain.Podcasts;
using Models.Requests.Podcasts;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IPodcastServices
    {
        Paged<Podcast> GetPodcastPaged(int pageIndex, int pageSize);
        List<Podcast> GetAllPodcast();
        int AddPodcast(PodcastAddRequest model, int currentUserId);
        void Update(PodcastUpdateRequest model, int userId, int id);
        Paged<Podcast> GetPodcastSearch(int pageIndex, int pageSize, string query);
        Paged<Podcast> GetPodcastCreatedBy(int pageIndex, int pageSize, int createdBy);
        void Delete(int id);
    }
}