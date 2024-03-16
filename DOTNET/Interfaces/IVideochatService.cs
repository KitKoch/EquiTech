using Models.Domain.Videochat;
using Models.Requests.Videochat;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IVideochatService
    {
        Task<Room> CreateVideoChatRoom(RoomAddRequest model);

        Task<Meeting> GetMeetingById(string meetingId);
    }
}