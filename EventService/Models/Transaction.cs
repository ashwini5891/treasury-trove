using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventService.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        
        [Required]
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        
        [Required]
        public TransactionType Type { get; set; }
        
        [StringLength(50)]
        public string Category { get; set; } = "Uncategorized";
        
        public int EventId { get; set; }
        public Event? Event { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
    
    public enum TransactionType
    {
        Income,
        Expense
    }
}
