using Microsoft.AspNetCore.Mvc;
using TransactionService.Data;
using TransactionService.Models;
using TransactionService.Models.Dtos;
using Microsoft.EntityFrameworkCore;


namespace TransactionService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context) => _context = context;

    [HttpPost]
    public async Task<IActionResult> CreateProfile([FromBody] CreateUserProfileDto dto)
    {
        var profile = new UserProfile
        {
            Id = Guid.NewGuid(),
            ExternalId = dto.ExternalId,
            Email = dto.Email,
            DisplayName = dto.DisplayName,
            CreatedAt = dto.CreatedAt,
            LastLoginAt = dto.LastLoginAt
        };

        _context.UserProfiles.Add(profile);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProfile), new { id = profile.Id }, profile);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfile(Guid id)
    {
        var user = await _context.UserProfiles.FindAsync(id);
        return user == null ? NotFound() : Ok(user);
    }
}
}
