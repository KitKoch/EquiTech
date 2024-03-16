using Models.Domain;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IExperienceService
    {
        List<LookUp3Col> GetAllExperience();
    }
}