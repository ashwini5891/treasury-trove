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
        // UserId is now obtained from the JWT token in the Authorization header
    }
}
