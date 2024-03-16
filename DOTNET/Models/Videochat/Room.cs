using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Videochat
{
    public class Room
    {
        public string Id { get; set; }

        public string Name { get; set; }
        public Boolean ApiCreated { get; set; }
        public string Privacy { get; set; }

        public string Url { get; set; }

        public string CreatedAt { get; set; }
        public VideoProperties Config { get; set; }
    }
}
