using System;

namespace TransactionService.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string Description { get; set; }
        public DateTime Timestamp { get; set; }

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        public Guid? EventId { get; set; }
        public Event? Event { get; set; }

        public Guid UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
