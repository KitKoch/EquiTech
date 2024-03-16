using Data.Providers;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Models;
using Data;
using Models.Requests.CandidatePreferencesRequest;
using Models.Domain.CandidatePreferences;

namespace Services
{
    public class CandidatePreferenceServices : ICandidatePreferenceServices
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;

        public CandidatePreferenceServices(IDataProvider data, IBaseUserMapper mapper)
        {
            _data = data;
            _userMapper = mapper;
        }

        public int Add(CandidatePreferencesAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[CandidatePreferences_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@UserId", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object old = returnCollection["@Id"].Value;
                    int.TryParse(old.ToString(), out id);
                });
            return id;
        }

        public void Update(CandidatePreferencesUpdateRequest model)
        {
            string procName = "[dbo].[CandidatePreferences_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                },
                 returnParameters: null);
        }

        public void Delete(CandidatePreferencesDeleteRequest model)
        {
            string procName = "[dbo].[CandidatePreferences_Delete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", model.Id);
                    collection.AddWithValue("@IsDeleted", model.IsDeleted);
                },
                 returnParameters: null);
        }

        public CandidatePreference GetById(int id)
        {
            string procName = "[dbo].[CandidatePreferences_Select_ById]";
            CandidatePreference candidatePreference = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    candidatePreference = SingleRecordMapper(reader, ref startingIndex);

                });
            return candidatePreference;
        }

        public CandidatePreference GetByUserId(int userId)
        {
            string procName = "[dbo].[CandidatePreferences_Select_ByUserId]";
            CandidatePreference candidatePreference = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@UserId", userId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    candidatePreference = SingleRecordMapper(reader, ref startingIndex);

                });
            return candidatePreference;
        }

        private CandidatePreference SingleRecordMapper(IDataReader reader, ref int startingIndex)
        {
            CandidatePreference candidatePreference = new CandidatePreference();

            candidatePreference.Id = reader.GetSafeInt32(startingIndex++);
            candidatePreference.User = _userMapper.MapUser(reader, ref startingIndex);
            candidatePreference.MinimumPay = reader.GetSafeDecimal(startingIndex++);
            candidatePreference.DesiredPay = reader.GetSafeDecimal(startingIndex++);
            candidatePreference.IsHourly = reader.GetSafeBool(startingIndex++);
            candidatePreference.IsDeleted = reader.GetSafeBool(startingIndex++);
            candidatePreference.DateCreated = reader.GetSafeDateTime(startingIndex++);
            candidatePreference.DateModified = reader.GetSafeDateTime(startingIndex++);
            return candidatePreference;
        }

        private static void AddCommonParams(CandidatePreferencesAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@MinimumPay", model.MinimumPay);
            collection.AddWithValue("@DesiredPay", model.DesiredPay);
            collection.AddWithValue("@IsHourly", model.IsHourly);
        }
    }
}
