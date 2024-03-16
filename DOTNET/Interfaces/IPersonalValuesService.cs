using Models.Domain;
using Models.Domain.PersonalValueRankings;
using Models.Domain.PersonalValues;
using Models.Requests.PersonalValueRankings;
using Models.Requests.PersonalValues;
using System.Collections.Generic;
using System.Data;

namespace Services.Interfaces
{
    public interface IPersonalValuesService
    {
        #region PersonalValueRankings

        void Add(PersonalValueRankingsSortRequest model, int userId);
        List<PersonalValueRankingsAvg> GetAvg();
        List<PersonalValueRanking> Get(int userId);
        void Update(PersonalValueRankings model, int userId);
        void Delete(int personValueId, int userId);
        void UpdateSort(List<PersonalValueRankingUpdateRequest> model, int userId);

        #endregion

        #region RelatedPersonalValues

        void Add(RelatedPersonalValuesAddRequest model);
        List<RelatedPersonalValues> GetById(int id);
        List<RelatedPersonalValues> SelectAll();
        void DeleteRelatedPersonalValues(int PersonalValueA, int PersonalValueB);
        RelatedPersonalValues MapSingleRelatedPersonalValue(IDataReader reader, ref int startingIndex);

        #endregion
    }
}