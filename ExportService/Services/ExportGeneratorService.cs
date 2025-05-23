using OfficeOpenXml;
using ExportService.Models;

public class ExportGeneratorService
{
    public byte[] GenerateExcelGroupedByEvent(List<ExportTransaction> transactions)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        using var package = new ExcelPackage();

        var grouped = transactions
            .GroupBy(t => new { t.EventId, t.EventName })
            .OrderBy(g => g.Key.EventName);

        foreach (var group in grouped)
        {
            var sheetName = group.Key.EventName.Length > 31
                ? group.Key.EventName.Substring(0, 31)
                : group.Key.EventName;

            var sheet = package.Workbook.Worksheets.Add(sheetName);

            // Add header
            sheet.Cells[1, 1].Value = "Date";
            sheet.Cells[1, 2].Value = "Amount";
            sheet.Cells[1, 3].Value = "Currency";
            sheet.Cells[1, 4].Value = "Description";
            sheet.Cells[1, 5].Value = "Category";
            sheet.Cells[1, 6].Value = "Entered By";

            int row = 2;
            foreach (var tx in group)
            {
                sheet.Cells[row, 1].Value = tx.Timestamp.ToString("yyyy-MM-dd");
                sheet.Cells[row, 2].Value = tx.Amount;
                sheet.Cells[row, 3].Value = tx.Currency;
                sheet.Cells[row, 4].Value = tx.Description;
                sheet.Cells[row, 5].Value = tx.CategoryName;
                sheet.Cells[row, 6].Value = tx.UserProfileName;
                row++;
            }

            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        }

        return package.GetAsByteArray();
    }
}
