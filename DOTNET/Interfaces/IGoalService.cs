using Models;
using Models.Domain.Goals;
using Models.Requests.Goals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IGoalService
    {
        int AddGoal(GoalAddRequest model, int UserId);
        Goal Get(int id);
        void Update(GoalUpdateRequest model, int UserId);
        void UpdateIsCompleted(int id);
        void Delete(int Id);
        Paged<Goal> GetByCreatedBy(int createdBy, int pageIndex, int pageSize);
        Paged<Goal> GetAll(bool completed, decimal minPay, decimal maxPay, int pageIndex, int pageSize);
        Paged<Goal> SearchGoalsByCandidate(bool completed, string query, int pageIndex, int pageSize);
        Paged<Goal> FilterByDesiredPay(string query, bool completed, decimal minPay, decimal maxPay, int pageIndex, int pageSize);
    }
}
