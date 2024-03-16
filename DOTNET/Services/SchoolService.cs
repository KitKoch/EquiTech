using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Schools;
using Models.Requests.Schools;
using Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Services
{
    public class SchoolService : ISchoolService, ISchoolMapperService
    {
        IDataProvider _data = null;

        public SchoolService(IDataProvider data)
        { _data = data; }

        public School MapSingleSchool(IDataReader reader, ref int startingIndex)
        {
            School school = new School();
            BaseUser user = new BaseUser();
            BaseLocation location = new BaseLocation();

            school.Id = reader.GetSafeInt32(startingIndex++);
            school.Name = reader.GetSafeString(startingIndex++);
            school.Location = location;
            location.Id = reader.GetSafeInt32(startingIndex++);
            location.LineOne = reader.GetSafeString(startingIndex++);
            location.LineTwo = reader.GetSafeString(startingIndex++);
            location.City = reader.GetSafeString(startingIndex++);
            location.State = reader.GetSafeString(startingIndex++);
            location.Zip = reader.GetSafeString(startingIndex++);
            school.LogoUrl = reader.GetSafeString(startingIndex++);
            school.IsDeleted = reader.GetSafeBool(startingIndex++);
            school.IsVerified = reader.GetSafeBool(startingIndex++);
            school.CreatedBy = user;
            user.Id = reader.GetSafeInt32(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            school.ModifiedBy = user;
            user.Id = reader.GetSafeInt32(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            school.DateCreated = reader.GetSafeDateTime(startingIndex++);
            school.DateModified = reader.GetSafeDateTime(startingIndex++);

            return school;
        }

        private static void AddCommonParams(SchoolAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@LocationId", model.LocationId);
            col.AddWithValue("@LogoUrl", model.LogoUrl);
        }

        public List<School> GetAll()
        {
            List<School> list = null;
            _data.ExecuteCmd("[dbo].[Schools_SelectAll]", null, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                School school = new School();
                BaseLocation location = new BaseLocation();
                school.Id = reader.GetSafeInt32(startingIndex++);
                school.Name = reader.GetSafeString(startingIndex++);
                school.Location = location;
                location.City = reader.GetSafeString(startingIndex++);
                location.State = reader.GetSafeString(startingIndex++);

                if (list == null)
                {
                    list = new List<School>();
                }
                list.Add(school);
            });

            return list;
        }
        public School GetById(int id)
        {
            School school = null;
            _data.ExecuteCmd("[dbo].[Schools_SelectById]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                school = MapSingleSchool(reader, ref startingIndex);


            });
            return school;
        }

        public Paged<School> GetPaged(int pageIndex, int pageSize)

        {
            Paged<School> pagedList = null;
            List<School> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Schools_Select_Paged]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                School school = MapSingleSchool(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex++);
                if (list == null)
                {
                    list = new List<School>();
                }
                list.Add(school);
            });
            if (list != null)
            {
                pagedList = new Paged<School>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        public Paged<School> SearchPaged(int pageIndex, int pageSize, string query)

        {
            Paged<School> pagedList = null;
            List<School> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Schools_Search_Paged]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                School school = MapSingleSchool(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex++);
                if (list == null)
                {
                    list = new List<School>();
                }
                list.Add(school);
            });
            if (list != null)
            {
                pagedList = new Paged<School>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        public int AddSchool(SchoolAddRequest model, int userId)
        {
            int id = 0;
            _data.ExecuteNonQuery("[dbo].[Schools_Insert]", delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, delegate (SqlParameterCollection rcol)
            {
                object idObj = rcol["@Id"].Value;
                int.TryParse(idObj.ToString(), out id);
            });
            return id;
        }

        public void UpdateSchool(SchoolUpdateRequest model, int userId)
        {
            _data.ExecuteNonQuery("[dbo].[Schools_Update]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@Name", model.Name);
                col.AddWithValue("@LocationId", model.LocationId);
                col.AddWithValue("@LogoUrl", model.LogoUrl);
                col.AddWithValue("@ModifiedBy", userId);
            }, null);

        }

        public void UpdateIsVerified(int schoolId, int userId)
        {
            _data.ExecuteNonQuery("[dbo].[Schools_IsVerified]", delegate (SqlParameterCollection col)
            {


                col.AddWithValue("@Id", schoolId);
                col.AddWithValue("@ModifiedBy", userId);

            }, null);

        }

        public void UpdateIsDeleted(int schoolId, int userId)
        {
            _data.ExecuteNonQuery("[dbo].[Schools_IsDeleted]", delegate (SqlParameterCollection col)
            {


                col.AddWithValue("@Id", schoolId);
                col.AddWithValue("@ModifiedBy", userId);

            }, null);

        }

    }
}
