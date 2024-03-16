using Models;
using Models.Domain.Videochat;
using Models.Requests.Videochat;

namespace Services.Interfaces
{
    public interface IVideochatStatisticsService
    {
        Statistics Get(int id);
        Paged<Statistics> GetByCreatedBy(int pageIndex, int pageSize, int createdBy);
        Paged<Statistics> GetPaginated(int pageIndex, int pageSize);
        int Add(StatisticsAddRequest statistics);
        void Delete(int id);
        int AddParticipants(MeetingParticipantsAddRequest statistics);
    }
}