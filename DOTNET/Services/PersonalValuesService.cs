using Data;
using Data.Extensions;
using Data.Providers;
using Models.Domain;
using Models.Domain.PersonalValueRankings;
using Models.Domain.PersonalValues;
using Models.Requests.PersonalValueRankings;
using Models.Requests.PersonalValues;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PersonalValuesService : IPersonalValuesService
    {
        private ILookUpService _lookUpService = null;
        IDataProvider _data = null;

        public PersonalValuesService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        #region PersonalValueRankings

        public List<PersonalValueRanking> Get(int userId)
        {
            string procName = "[dbo].[PersonalValueRankings_Select_ByUserIdV3]";
            List<PersonalValueRanking> list = null;
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@userId", userId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    PersonalValueRanking personalValues = MapSinglePersonalValue(reader);
                    if (list == null)
                    {
                        list = new List<PersonalValueRanking>();
                    }
                    list.Add(personalValues);
                });
            return list;
        }

        public List<PersonalValueRankingsAvg> GetAvg()
        {
            string procName = "[dbo].[PersonalValueRankings_Select_Summary]";
            List<PersonalValueRankingsAvg> list = null;
            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    PersonalValueRankingsAvg personalValuesAve = MapSinglePersonalValueAve(reader);
                    if (list == null)
                    {
                        list = new List<PersonalValueRankingsAvg>();
                    }
                    list.Add(personalValuesAve);
                });
            return list;
        }

        public void Add(PersonalValueRankingsSortRequest model, int userId)
        {
            string procName = "[dbo].[PersonalValueRankings_InsertV2]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@PersonalValueId", model.PersonalValueId);
                    col.AddWithValue("@Rank", model.Rank);
                    col.AddWithValue("@Sort", model.Sort);
                }, returnParameters: null);
        }

        public void Update(PersonalValueRankings model, int userId)
        {
            string procName = "[dbo].[PersonalValueRankings_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, userId, col);
                }, returnParameters: null);
        }

        public void UpdateSort(List<PersonalValueRankingUpdateRequest> model, int userId)
        {
            string procName = "[dbo].[PersonalValueRankings_UpdateV2]";
            DataTable SortInput = MapModelToTable(model);
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@BatchSort", SortInput);
                }, returnParameters: null);
        }

        public void Delete(int personValueId, int userId)
        {
            string procName = "[dbo].[PersonalValueRankings_Delete]";
            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@PersonalValueId", personValueId);
                });
        }

        #endregion

        #region RelatedPersonalValues
        public void Add(RelatedPersonalValuesAddRequest model)
        {
            string procName = "[dbo].[RelatedPersonalValues_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PersonalValueA", model.PersonalValueA);
                    col.AddWithValue("@PersonalValueB", model.PersonalValueB);
                }, returnParameters: null);
        }

        public List<RelatedPersonalValues> GetById(int id)
        {
            string procName = "[dbo].[RelatedPersonalValues_Select_ById]";
            List<RelatedPersonalValues> list = null;
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    RelatedPersonalValues relatedPersonalValues = MapSingleRelatedPersonalValue(reader, ref startingIndex);
                    if (list == null)
                    {
                        list = new List<RelatedPersonalValues>();
                    }
                    list.Add(relatedPersonalValues);
                });
            return list;
        }

        public List<RelatedPersonalValues> SelectAll()
        {
            string procName = "[dbo].[RelatedPersonalValues_SelectAll]";
            List<RelatedPersonalValues> list = null;
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                { },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    RelatedPersonalValues relatedPersonalValues = MapSingleRelatedPersonalValue(reader, ref startingIndex);
                    if (list == null)
                    {
                        list = new List<RelatedPersonalValues>();
                    }
                    list.Add(relatedPersonalValues);
                });
            return list;
        }

        public void DeleteRelatedPersonalValues(int PersonalValueA, int PersonalValueB)
        {
            string procName = "[dbo].[RelatedPersonalValues_Delete]";
            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PersonalValueA", PersonalValueA);
                    col.AddWithValue("@PersonalValueB", PersonalValueB);
                });
        }

        #endregion

        #region MapperFunctions
        private static void AddCommonParams(PersonalValueRankings model, int userId, SqlParameterCollection col)
        {
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@PersonalValueId", model.PersonalValueId);
            col.AddWithValue("@Rank", model.Rank);
        }

        private static PersonalValueRanking MapSinglePersonalValue(IDataReader reader)
        {
            PersonalValueRanking personalValues = new PersonalValueRanking();
            int idx = 0;
            personalValues.Id = reader.GetSafeInt32(idx++);
            personalValues.Name = reader.GetSafeString(idx++);
            personalValues.Rank = reader.GetSafeInt32(idx++);
            personalValues.DateCreated = reader.GetSafeDateTime(idx++);
            personalValues.DateModified = reader.GetSafeDateTime(idx++);
            personalValues.Sort = reader.GetSafeInt32(idx++);
            return personalValues;
        }

        private static PersonalValueRankingsAvg MapSinglePersonalValueAve(IDataReader reader)
        {
            PersonalValueRankingsAvg personalValuesAve = new PersonalValueRankingsAvg();
            int idx = 0;
            personalValuesAve.Id = reader.GetSafeInt32(idx++);
            personalValuesAve.Name = reader.GetSafeString(idx++);
            personalValuesAve.AverageRank = reader.GetSafeInt32(idx++);
            return personalValuesAve;
        }

        private DataTable MapModelToTable(List<PersonalValueRankingUpdateRequest> sortInputs)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("PvId", typeof(int));
            dt.Columns.Add("Sort", typeof(int));
            foreach (PersonalValueRankingUpdateRequest singleRecord in sortInputs)
            {
                dt.Rows.Add(singleRecord.PvId, singleRecord.Sort);
            }
            return dt;
        }

        public RelatedPersonalValues MapSingleRelatedPersonalValue(IDataReader reader, ref int startingIndex)
        {
            RelatedPersonalValues relatedPersonalValues = new RelatedPersonalValues();

            relatedPersonalValues.PersonalValueA = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            relatedPersonalValues.PersonalValueB = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            return relatedPersonalValues;
        }

        #endregion
    }
}