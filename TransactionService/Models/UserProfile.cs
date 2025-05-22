using System;

namespace TransactionService.Models
{
    public class UserProfile
    {
        public Guid Id { get; set; } // Internal ID
        public string ExternalId { get; set; } = null!; // e.g. Keycloak "sub"
        public string Email { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
    }
}
