using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain.Videochat
{
    public class VideoProperties
    {
        public Boolean StartAudioOff { get; set; }

        public Boolean StartVideoOff { get; set; }

        public Boolean EnableChat { get; set; }
        public long Exp { get; set; }
    }
}
