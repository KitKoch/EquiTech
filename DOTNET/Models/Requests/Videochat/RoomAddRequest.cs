using Models.Domain.Videochat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests.Videochat
{
    public class RoomAddRequest
    {
        public VideoProperties Properties { get; set; }

        public int Privacy { get; set; }

        public string Name { get; set; }

    }
}
