using Microsoft.AspNetCore.Builder;
using TransactionService.Middleware;

namespace TransactionService.Extensions
{
    public static class ServiceExtensions
    {
        public static IApplicationBuilder UseJwtMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtMiddleware>();
        }
    }
}
