using Microsoft.AspNetCore.SignalR;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ChatHub : Hub<IChatClients>
    {
        private IMessageService _messageService = null;
        private IAuthenticationService<int> _authService = null;

        public ChatHub(IMessageService service
            , IAuthenticationService<int> authService)
        {
            _messageService = service;
            _authService = authService;
        }

        public override async Task OnConnectedAsync()
        {
            int userId = _authService.GetCurrentUserId();
            await _messageService.UserConnected(userId, Context.ConnectionId);
            await base.OnConnectedAsync();
        }

#nullable enable
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            int userId = _authService.GetCurrentUserId();
            _messageService.UserDisconnected(userId);
            await base.OnDisconnectedAsync(exception);
        }
#nullable disable
    }
}
