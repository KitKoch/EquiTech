﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.PersonalValues
{
    public class RelatedPersonalValues
    {

        public LookUp PersonalValueA { get; set; }
        public LookUp PersonalValueB { get; set; }


    }
}
