using Models.Domain.Messages;
using Models.Requests.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IChatClients
    {
        Task ReceiveMessage(MessageModel msg);
    }
}
