namespace TransactionService.Models.Dtos
{
    public class CreateTransactionDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string Description { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid AccountId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? EventId { get; set; }
    }
}
