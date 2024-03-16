using Models;
using Models.Domain.Appointment;
using Models.Requests.Appointments;

namespace Services.Interfaces
{
    public interface IAppointmentService
    {
        int AddAppointment(AppointmentAddRequest model, int userId);
        void UpdateAppointmentConfirmation(int id);
        void UpdateAppointment(AppointmentUpdateRequest model, int userId);
        void DeleteAppointment(int id);
        Appointment GetAppointmentById(int id);
        Paged<Appointment> GetAppointmentByClientId(int pageIndex, int pageSize, int clientId);
        Paged<Appointment> GetAppointmentByCreatedById(int pageIndex, int pageSize, int createdById);
        Paged<Appointment> GetAppointmentByOrgId(int pageIndex, int pageSize, int organizationId);
    }
}