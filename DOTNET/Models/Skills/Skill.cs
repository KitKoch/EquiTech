using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Skills
{
	public class Skill : BaseSkill
	{

		public string Description { get; set; }
		public bool IsDeleted { get; set; }
		public bool IsApproved { get; set; }
		public int CreatedBy { get; set; }
		public int ModifiedBy { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateModified { get; set; }

	}
}
