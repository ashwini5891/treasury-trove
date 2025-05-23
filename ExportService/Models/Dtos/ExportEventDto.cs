namespace ExportService.Models.Dtos
{
    public class ExportEventDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public Guid OrganizationId { get; set; }
    }

    public class CreateExportEventDto
    {
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public Guid OrganizationId { get; set; }
    }

    public class UpdateExportEventDto
    {
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}
