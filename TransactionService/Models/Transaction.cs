using System;

namespace TransactionService.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public required string Description { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        public Guid? EventId { get; set; }
        public Event? Event { get; set; }

        public required string UserId { get; set; } // Changed from UserProfileId to UserId (string for Supabase ID)
    }
}
