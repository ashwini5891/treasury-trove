using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace TransactionService.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Check if the request has an Authorization header
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                
                try
                {
                    // Extract the JWT token and decode it
                    var handler = new JwtSecurityTokenHandler();
                    var jwtToken = handler.ReadJwtToken(token);
                    
                    // Log all claims for debugging
                    Console.WriteLine("JWT Token Claims:");
                    foreach (var claim in jwtToken.Claims)
                    {
                        Console.WriteLine($"{claim.Type}: {claim.Value}");
                    }
                    
                    // Get the user ID from the JWT token (using 'sub' claim)
                    var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                    
                    if (userId != null)
                    {
                        // Add the user ID to the HttpContext items so it can be accessed in the controllers
                        context.Items["sub"] = userId;
                        Console.WriteLine($"Extracted user ID from token: {userId}");
                    }
                    else
                    {
                        Console.WriteLine("Warning: 'sub' claim not found in token");
                    }
                }
                catch (Exception)
                {
                    // If there's an error reading the token, just continue without setting the user ID
                    // The [Authorize] attribute will handle the authentication
                }
            }

            await _next(context);
        }
    }
}
