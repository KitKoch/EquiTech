using Models.Domain.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.ShareStorys
{
    public class ShareStory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Story { get; set; }
        public BaseUser Author { get; set; }
        public bool IsApproved { get; set; }
        public BaseUser ApprovedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public File File { get; set; }

    }
}
