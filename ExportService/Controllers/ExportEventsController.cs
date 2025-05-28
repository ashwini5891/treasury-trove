using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExportService.Data;
using ExportService.Models.Dtos;
using ExportService.Services;

namespace ExportService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportEventsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ExportEventsController> _logger;
        private readonly IExportGeneratorService _exportGenerator; // Changed to interface

        public ExportEventsController(
            AppDbContext context, 
            ILogger<ExportEventsController> logger,
            IExportGeneratorService exportGenerator) // Changed to interface
        {
            _context = context;
            _logger = logger;
            _exportGenerator = exportGenerator;
        }

        // GET: api/ExportEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExportEventDto>>> GetExportEvents(Guid organizationId)
        {
            return await _context.ExportEvents
                .Where(e => e.OrganizationId == organizationId)
                .Select(e => new ExportEventDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Date = e.Date,
                    OrganizationId = e.OrganizationId
                })
                .ToListAsync();
        }

        [HttpGet("download")]
    public async Task<IActionResult> DownloadExport()
    {
        var transactions = await _context.ExportTransactions
            .Where(t => !string.IsNullOrEmpty(t.EventName))
            .ToListAsync();

        var fileBytes = _exportGenerator.GenerateExcelGroupedByEvent(transactions);

        var fileName = $"TreasuryTrove_Export_{DateTime.UtcNow:yyyyMMdd}.xlsx";
        return File(fileBytes, 
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
            fileName);
    }

        // GET: api/ExportEvents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExportEventDto>> GetExportEvent(Guid id)
        {
            var exportEvent = await _context.ExportEvents.FindAsync(id);

            if (exportEvent == null)
            {
                return NotFound();
            }

            return new ExportEventDto
            {
                Id = exportEvent.Id,
                Name = exportEvent.Name,
                Date = exportEvent.Date,
                OrganizationId = exportEvent.OrganizationId
            };
        }

        // POST: api/ExportEvents
        [HttpPost]
        public async Task<ActionResult<ExportEventDto>> PostExportEvent(CreateExportEventDto createDto)
        {
            var exportEvent = new Models.ExportEvent
            {
                Id = Guid.NewGuid(),
                Name = createDto.Name,
                Date = createDto.Date,
                OrganizationId = createDto.OrganizationId
            };

            _context.ExportEvents.Add(exportEvent);
            await _context.SaveChangesAsync();

            var dto = new ExportEventDto
            {
                Id = exportEvent.Id,
                Name = exportEvent.Name,
                Date = exportEvent.Date,
                OrganizationId = exportEvent.OrganizationId
            };

            return CreatedAtAction(nameof(GetExportEvent), new { id = exportEvent.Id }, dto);
        }

        // PUT: api/ExportEvents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExportEvent(Guid id, UpdateExportEventDto updateDto)
        {
            var exportEvent = await _context.ExportEvents.FindAsync(id);
            if (exportEvent == null)
            {
                return NotFound();
            }

            exportEvent.Name = updateDto.Name;
            exportEvent.Date = updateDto.Date;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExportEventExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/ExportEvents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExportEvent(Guid id)
        {
            var exportEvent = await _context.ExportEvents.FindAsync(id);
            if (exportEvent == null)
            {
                return NotFound();
            }

            _context.ExportEvents.Remove(exportEvent);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool ExportEventExists(Guid id)
        {
            return _context.ExportEvents.Any(e => e.Id == id);
        }
    }
}
