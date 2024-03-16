using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.EducationRequirements
{
	public class EducationRequirement
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int EducationLevelId { get; set; }
		public int DegreeId { get; set; }
		public int OrganizationId { get; set; }
		public bool IsExperienceAllowed { get; set; }
		public int MinYears { get; set; }
		public int CreatedBy { get; set; }
		public int ModifiedBy { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateModified { get; set; }
		public bool IsDeleted { get; set; }
	}
}