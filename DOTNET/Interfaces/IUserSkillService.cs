using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Domain.UserSkills;
using Models.Requests;
using System.Collections.Generic;
using System.Data;

namespace Sabio.Services.Interfaces
{
    public interface IUserSkillService
    {
        void Create(UserSkillsAddRequest model, int userId);
        void Delete(int userId, int skillId);
        List<UserSkill> GetAll();
        void Update(UserSkillsAddRequest model, int userId);
        Paged<UserSkill> GetByUserId(int userId, int pageIndex, int pageSize);
        Paged<UserSkill> GetSearchPagination(string query, int pageIndex, int pageSize);
        void CreateBulk(List<UserSkillsAddRequest> models, int userId);
        DataTable MapSingleSkill(List<UserSkillsAddRequest> models, int userId);
    }
}