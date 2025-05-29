namespace TransactionService.Models.Dtos
{
    public class CreateTransactionDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "GBP";
        public required string Description { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? EventId { get; set; }
        public required string UserId { get; set; }  // Changed from UserProfileId to UserId (string for Supabase ID)
    }
}
