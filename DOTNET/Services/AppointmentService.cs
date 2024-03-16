using Data;
using Data.Providers;
using Models;
using Models.Domain.Appointment;
using Models.Domain.Locations;
using Models.Domain.Users;
using Models.Requests.Appointments;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AppointmentService : IAppointmentService
    {

        private static IDataProvider _data = null;
        private static IBaseUserMapper _userMapper = null;
        private static ILookUpService _lookUpService = null;

        public AppointmentService(IDataProvider data, IBaseUserMapper userMapper, ILookUpService lookUpService)
        {
            _data = data;
            _userMapper = userMapper;
            _lookUpService = lookUpService;
        }

        public int AddAppointment(AppointmentAddRequest model, int userId)
        {
            string procName = "[dbo].[Appointments_Insert]";

            int id = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(model, collection);
                collection.AddWithValue("@CreatedBy", userId);
                collection.AddWithValue("@ModifiedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                collection.Add(idOut);


            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });


            return id;
        }

        public void UpdateAppointment(AppointmentUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Appointments_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {

                AddCommonParams(model, collection);
                collection.AddWithValue("@ModifiedBy", userId);
                collection.AddWithValue("@Id", model.Id);


            }, returnParameters: null);
        }


        public void UpdateAppointmentConfirmation(int id)
        {
            string procName = "[dbo].[Appointments_Confirmation_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {

                collection.AddWithValue("@Id", id);


            }, returnParameters: null);
        }


        public void DeleteAppointment(int id)
        {
            string procName = "[dbo].[Appointments_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }


        public Appointment GetAppointmentById(int id)
        {
            string procName = "[dbo].[Appointments_Select_ById]";

            Appointment appointment = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                appointment = MapSingleAppointment(reader, ref index);

            });

            return appointment;
        }


        public Paged<Appointment> GetAppointmentByClientId(int pageIndex, int pageSize, int clientId)
        {
            string procName = "[dbo].[Appointments_Select_ByClientId]";
            Paged<Appointment> pagedResult = null;
            List<Appointment> result = null;
            int totalCount = 0;
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@ClientId", clientId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startOfIndex = 0;
                Appointment model = MapSingleAppointment(reader, ref startOfIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startOfIndex++);
                }

                if (result == null)
                {
                    result = new List<Appointment>();
                }

                result.Add(model);
            });

            if (result != null)
            {
                pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Appointment> GetAppointmentByCreatedById(int pageIndex, int pageSize, int createdById)
        {
            string procName = "[dbo].[Appointments_Select_ByCreatedById]";
            Paged<Appointment> pagedResult = null;
            List<Appointment> result = null;
            int totalCount = 0;
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@CreatedById", createdById);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startOfIndex = 0;
                Appointment model = MapSingleAppointment(reader, ref startOfIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startOfIndex++);
                }

                if (result == null)
                {
                    result = new List<Appointment>();
                }

                result.Add(model);
            });

            if (result != null)
            {
                pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Appointment> GetAppointmentByOrgId(int pageIndex, int pageSize, int organizationId)
        {
            string procName = "[dbo].[Appointments_Select_ByOrgId]";
            Paged<Appointment> pagedResult = null;
            List<Appointment> result = null;
            int totalCount = 0;
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@OrganizationId", organizationId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startOfIndex = 0;
                Appointment anAppointment = MapSingleAppointment(reader, ref startOfIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startOfIndex++);
                }

                if (result == null)
                {
                    result = new List<Appointment>();
                }

                result.Add(anAppointment);
            });

            if (result != null)
            {
                pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        private static void AddCommonParams(AppointmentAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@AppointmentTypeId", model.AppointmentTypeId);
            collection.AddWithValue("@ClientId", model.ClientId);
            collection.AddWithValue("@TeamMemberId", model.TeamMemberId);
            collection.AddWithValue("@Notes", model.Notes);
            collection.AddWithValue("LocationId", model.LocationId);
            collection.AddWithValue("@IsConfirmed", model.IsConfirmed);
            collection.AddWithValue("@AppointmentStart", model.AppointmentStart);
            collection.AddWithValue("@AppointmentEnd", model.AppointmentEnd);
            collection.AddWithValue("@StatusTypesId", model.StatusTypesId);
        }


        private Appointment MapSingleAppointment(IDataReader reader, ref int index)
        {
            Appointment model = new Appointment();

            model.Id = reader.GetSafeInt32(index++);
            model.AppointmentType = _lookUpService.MapSingleLookUp(reader, ref index);
            model.StatusType = _lookUpService.MapSingleLookUp(reader, ref index);
            model.Client = new User();
            model.Client.Id = reader.GetSafeInt32(index++);
            model.Client.FirstName = reader.GetSafeString(index++);
            model.Client.LastName = reader.GetSafeString(index++);
            model.Client.Mi = reader.GetSafeString(index++);
            model.Client.Email = reader.GetSafeString(index++);
            model.Client.AvatarUrl = reader.GetSafeString(index++);
            model.IsConfirmed = reader.GetSafeBool(index++);
            model.TeamMember = new User();
            model.TeamMember.Id = reader.GetSafeInt32(index++);
            model.TeamMember.FirstName = reader.GetSafeString(index++);
            model.TeamMember.LastName = reader.GetSafeString(index++);
            model.TeamMember.Mi = reader.GetSafeString(index++);
            model.TeamMember.Email = reader.GetSafeString(index++);
            model.TeamMember.AvatarUrl = reader.GetSafeString(index++);
            model.Notes = reader.GetSafeString(index++);
            model.Location = new Location();
            model.Location.Id = reader.GetSafeInt32(index++);
            model.Location.LineOne = reader.GetSafeString(index++);
            model.Location.LineTwo = reader.GetSafeString(index++);
            model.Location.City = reader.GetSafeString(index++);
            model.Location.Zip = reader.GetSafeString(index++);
            model.AppointmentStart = reader.GetSafeDateTime(index++);
            model.AppointmentEnd = reader.GetSafeDateTime(index++);
            model.DateCreated = reader.GetSafeDateTime(index++);
            model.DateModified = reader.GetSafeDateTime(index++);
            model.CreatedBy = _userMapper.MapUser(reader, ref index);
            model.ModifiedBy = _userMapper.MapUser(reader, ref index);


            return model;


        }
    }
}
