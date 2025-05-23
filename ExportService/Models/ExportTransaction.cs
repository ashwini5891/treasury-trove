using System;

namespace ExportService.Models
{
    public class ExportTransaction
    {
        public Guid Id { get; set; }

        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string? Description { get; set; }
        public DateTime Timestamp { get; set; }

        // Denormalized Event data
        public Guid EventId { get; set; }
        public string EventName { get; set; }

        // Denormalized Category data
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; }

        // Denormalized UserProfile data
        public Guid? UserProfileId { get; set; }
        public string? UserProfileName { get; set; }

        public Guid OrganizationId { get; set; }
    }
}
