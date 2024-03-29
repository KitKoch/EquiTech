﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Skills
{
    public class SkillUpdateRequest : SkillAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
