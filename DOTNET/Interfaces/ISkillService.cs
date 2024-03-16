using Models;
using Models.Domain.Skills;
using Models.Requests.Skills;
using System.Collections.Generic;

namespace Services
{
    public interface ISkillService
    {
        int AddSkill(SkillAddRequest model, int userId);
        void UpdateSkill(SkillUpdateRequest model, int userId);
        void DeleteSkill(int userId, int id);
        void UpdateSkillIsApproved(SkillUpdateIsApprovedRequest model, int userId);
        Skill GetSkillById(int id);
        Paged<Skill> GetSkillPaged(int pageIndex, int pageSize);
        List<Skill> GetSkillByIndustryId(int industryId);
        List<BaseSkill> GetALLSkills();
    }
}