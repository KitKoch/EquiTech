using Models;
using System.Collections.Generic;
using Models.Requests.Licenses;

namespace Services.Interfaces
{
    public interface ILicenseServices
    {
        int AddLicense(LicenseAddRequest addModel, int userId);
        void Update(LicenseUpdateRequest requestModel, int userId);
        void DeleteLicenseById(int id);
        Paged<License> SelectAllLicenses(int pageIndex, int pageSize);
        List<License> SelectByCreatedById(int id);
    }
}