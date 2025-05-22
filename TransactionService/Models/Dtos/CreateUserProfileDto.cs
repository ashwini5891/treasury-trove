namespace TransactionService.Models.Dtos
{
    public class CreateUserProfileDto
    {
        public Guid Id { get; set; }
        public string ExternalId { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
    }
}
