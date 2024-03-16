using Models.Domain.Locations;
using Models.Domain.Schools;
using System;

namespace Models.Domain.UsersEducationLevels
{
    public class UserEducation
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public School School { get; set; }
        public Location Location { get; set; }
        public LookUp EducationLevel { get; set; }
        public LookUp Degree { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}
