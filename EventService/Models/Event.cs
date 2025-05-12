using System.ComponentModel.DataAnnotations;

namespace EventService.Models
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public DateTime EventDate { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Location { get; set; } = string.Empty;
        
        public decimal Budget { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
