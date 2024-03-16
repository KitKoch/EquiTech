using Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Threads
{
    public class Thread
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public int ForumId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser Author { get; set; }
        public int ParentThreadId { get; set; }
        public string ForumName { get; set; }
        public List<Thread> Replies { get; set; }

    }
}
