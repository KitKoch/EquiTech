﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Requests
{
    public class EntityUpdateRequest : IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}
