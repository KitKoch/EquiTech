using Data;
using Data.Providers;
using Models.Domain.UsersEducationLevels;
using Models.Requests.UsersEducationLevels;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using.Models.Domain.Schools;
using Models;
using Services.Interfaces;

namespace Services
{
    public class UserEducationService : IUserEducationService
    {

        private IDataProvider _data;
        private IDegreeService _degreeService;
        private ILookUpService _lookUpMapper;
        private ISchoolMapperService _schoolMapper;

        public UserEducationService(IDataProvider data, ILookUpService lookUpMapper, ISchoolMapperService schoolMapperService, IDegreeService degreeService)
        {
            _data = data;
            _lookUpMapper = lookUpMapper;
            _schoolMapper = schoolMapperService;
            _degreeService = degreeService;
        }

        public UserEducation GetById(int id)
        {
            UserEducation userEducation = null;
            string procName = "dbo.UsersEducation_Select_ById_V2";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Id", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                userEducation = MapSingleUserEducation(reader, ref index);

            });

            return userEducation;
        }

        public List<UserEducation> GetByUserId(int UserId)
        {

            List<UserEducation> list = null;
            string procName = "dbo.UsersEducation_Select_ByUserId_V2";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@UserId", UserId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                UserEducation userEducation = new UserEducation();
                int index = 0;
                userEducation = MapSingleUserEducation(reader, ref index);

                if (list == null)
                {
                    list = new List<UserEducation>();
                }
                list.Add(userEducation);
            });

            return list;
        }

        public Paged<UserEducation> GetPagedByCreatedBy(int userId, int pageIndex, int pageSize)
        {
            string procName = "dbo.UsersEducation_Select_ByCreatedBy_V2";
            Paged<UserEducation> pagedList = null;
            List<UserEducation> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@UserId", userId);
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                UserEducation userEducation = MapSingleUserEducation(reader, ref index);
                totalCount = reader.GetSafeInt32(index++);

                if (list == null)
                {
                    list = new List<UserEducation>();
                }
                list.Add(userEducation);
            });

            if (list != null)
            {
                pagedList = new Paged<UserEducation>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public int Add(UserEducationAddRequest model, int userId)
        {
            int id = 0;

            string procName = "dbo.UsersEducation_Insert_V2";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection coll)
            {
                AddCommonParams(model, coll);
                coll.AddWithValue("@UserID", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                coll.Add(idOut);
            },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        public int AddWithDegrees(UserEducationAddRequest model, int userId)
        {
            int id = 0;
            DataTable batchDegrees = _degreeService.MapSingleDegree(model.Degrees);
            string procName = "dbo.UsersEducation_AndDegrees_Insert";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection coll)
            {
                AddCommonParams(model, coll);
                coll.AddWithValue("@UserID", userId);
                coll.AddWithValue("@BatchDegrees", batchDegrees);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                coll.Add(idOut);

            },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        public void Update(UserEducationUpdateRequest model, int userId)
        {
            string procName = "dbo.UsersEducation_Update_V2";
            DataTable batchDegrees = _degreeService.MapSingleDegree(model.Degrees);

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection coll)
            {
                AddCommonParams(model, coll);
                coll.AddWithValue("@Id", model.Id);
                coll.AddWithValue("@UserID", userId);
                coll.AddWithValue("@BatchDegrees", batchDegrees);

            }, returnParameters: null);
        }

        public void Delete(int id, int userId)
        {
            string procName = "dbo.[UsersEducation_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection coll)
            {
                coll.AddWithValue("@Id", id);
                coll.AddWithValue("@UserID", userId);

            }, returnParameters: null);
        }

        private static void AddCommonParams(UserEducationAddRequest model, SqlParameterCollection coll)
        {
            coll.AddWithValue("@SchoolId", model.SchoolId);
            coll.AddWithValue("@EducationLevelId", model.EducationLevelId);
            coll.AddWithValue("@Description", model.Description);
            coll.AddWithValue("@StartDate", model.StartDate);
            coll.AddWithValue("@EndDate", model.EndDate);
        }

        private UserEducation MapSingleUserEducation(IDataReader reader, ref int index)
        {
            UserEducation userEducation = new UserEducation();
            userEducation.Id = reader.GetSafeInt32(index++);

            userEducation.School = _schoolMapper.MapSingleSchool(reader, ref index);
            userEducation.EducationLevel = _lookUpMapper.MapSingleLookUp(reader, ref index);
            userEducation.Degree = _lookUpMapper.MapSingleLookUp(reader, ref index);

            userEducation.Description = reader.GetSafeString(index++);
            userEducation.IsDeleted = reader.GetSafeBool(index++);
            userEducation.StartDate = reader.GetSafeDateTime(index++);
            userEducation.EndDate = reader.GetSafeDateTime(index++);
            userEducation.CreatedBy = reader.GetSafeInt32(index++);
            userEducation.ModifiedBy = reader.GetSafeInt32(index++);
            userEducation.DateCreated = reader.GetSafeDateTime(index++);
            userEducation.DateModified = reader.GetSafeDateTime(index++);

            return userEducation;
        }
    }
}
