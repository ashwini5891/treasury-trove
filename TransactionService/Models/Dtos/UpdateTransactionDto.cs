using System;

namespace TransactionService.Models.Dtos
{
    public class UpdateTransactionDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "GBP";
        public string Description { get; set; } = "Transaction";
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public Guid? CategoryId { get; set; }
        public Guid? EventId { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool? IsDeleted { get; set; }
        public Guid? DeletedBy { get; set; }
    }
}
