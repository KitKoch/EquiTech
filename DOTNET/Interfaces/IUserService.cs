using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Domain.Users;
using Models.Requests.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserService
    {
        int Create(UserAddRequest model);

        Task<bool> LogInAsync(LoginRequest model);

        Task<bool> LogInTest(string email, string password, int id, string[] roles = null);

        User GetById(int id);
        string ForgotPassword(string email);

        void ChangeUserPassword(ChangePasswordRequest model);

        Paged<User> GetByStatus(int statusId, int pageIndex, int pageSize);

        Paged<User> GetPaginated(int pageIndex, int pageSize);

        Paged<User> SearchPaginated(string query, int pageIndex, int pageSize);

        List<User> SelectRelated(int userId);

        Paged<User> SearchWithStatusPaginated(string query, int statusId, int pageIndex, int pageSize);

        List<User> GetAllCandidates();

        Paged<User> GetAllCandidatesPaginated(int pageIndex, int pageSize);

        void UpdateUserStatus(int userId, int statusId);

        void UpdateUserProfileVisability(int userId, bool viewable);

        void UpdateUserAvatar(int userId, string avatarUrl);

        void UpdateById(UserUpdateRequest model);

        void ConfirmUser(int userId);

        void AddUserToken(string token, int userId, int tokenType);

        void DeleteUserToken(string token);


        void ChangePassword(ChangePasswordRequest model, int userId);
    }
}