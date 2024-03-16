using Microsoft.AspNetCore.Authentication.Cookies;

namespace Web.Core.Services
{
    internal static class AuthenticationDefaults
    {
        public const string AuthenticationScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    }
}