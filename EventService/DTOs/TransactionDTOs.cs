using System.ComponentModel.DataAnnotations;
using EventService.Models;

namespace EventService.DTOs
{
    public class CreateTransactionDto
    {
        [Required]
        [StringLength(200)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }
        
        [Required]
        public TransactionType Type { get; set; }
        
        [StringLength(50)]
        public string Category { get; set; } = "Uncategorized";
        
        public int EventId { get; set; }
    }

    public class TransactionDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public TransactionType Type { get; set; }
        public string Category { get; set; } = "Uncategorized";
        public int EventId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
