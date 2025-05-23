using System;

namespace TransactionService.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string Description { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }  

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public Guid? DeletedBy { get; set; } 

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        public Guid? EventId { get; set; }
        public Event? Event { get; set; }

        public Guid? UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
