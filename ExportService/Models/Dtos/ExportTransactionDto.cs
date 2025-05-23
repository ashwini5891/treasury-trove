namespace ExportService.Models.Dtos
{
    public class ExportTransactionDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid EventId { get; set; }
        public string EventName { get; set; } = string.Empty;
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public Guid OrganizationId { get; set; }
    }

    public class CreateExportTransactionDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid EventId { get; set; }
        public string EventName { get; set; } = string.Empty;
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public Guid OrganizationId { get; set; }
    }

    public class UpdateExportTransactionDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; }
    }
}
