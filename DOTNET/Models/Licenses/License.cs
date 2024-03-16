using Models.Domain;
using Models.Domain.Files;
using System;

public class License
{
    public int Id { get; set; }
    public int LicenseStateId { get; set; }
    public string StateName { get; set; }
    public string LicenseNumber { get; set; }
    public string LicenseName { get; set; }
    public BaseUser CreatedBy { get; set; }
    public bool IsActive { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateVerified { get; set; }
    public DateTime ExpirationDate { get; set; }
    public File File { get; set; }

}
