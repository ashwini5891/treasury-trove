using System.Collections.Generic;
using ExportService.Models;

namespace ExportService.Services
{
    public interface IExportGeneratorService
    {
        byte[] GenerateExcelGroupedByEvent(List<Models.ExportTransaction> transactions);
    }
}
