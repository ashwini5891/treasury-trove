using System;

namespace ExportService.Models
{
    public class ExportEvent
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public Guid OrganizationId { get; set; }
    }
}
