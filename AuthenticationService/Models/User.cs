namespace AuthenticationService.Models
{
    public class User
    {
        public Guid Id { get; set; } // Could match Keycloak sub claim (UUID)
        public string KeycloakId { get; set; } // Or store sub as string
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

