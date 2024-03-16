using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Emails
{
    public enum EmailType
    {
        Activation = 1,
        Invitation = 2,
        PasswordChange = 3,
    }
}
