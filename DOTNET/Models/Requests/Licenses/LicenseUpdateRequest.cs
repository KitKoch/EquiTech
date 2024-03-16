using Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests.Licenses
{
    public class LicenseUpdateRequest : LicenseAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
        public DateTime? DateVerified { get; set; }
    }
}