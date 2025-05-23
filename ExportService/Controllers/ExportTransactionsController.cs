using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExportService.Data;
using ExportService.Models.Dtos;

namespace ExportService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportTransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ExportTransactionsController> _logger;

        public ExportTransactionsController(AppDbContext context, ILogger<ExportTransactionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/ExportTransactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExportTransactionDto>>> GetExportTransactions(Guid organizationId, Guid? eventId = null)
        {
            var query = _context.ExportTransactions
                .Where(t => t.OrganizationId == organizationId);

            if (eventId.HasValue)
            {
                query = query.Where(t => t.EventId == eventId.Value);
            }

            return await query
                .Select(t => new ExportTransactionDto
                {
                    Id = t.Id,
                    Amount = t.Amount,
                    Currency = t.Currency,
                    Description = t.Description,
                    Timestamp = t.Timestamp,
                    EventId = t.EventId,
                    EventName = t.EventName,
                    CategoryId = t.CategoryId,
                    CategoryName = t.CategoryName,
                    OrganizationId = t.OrganizationId
                })
                .ToListAsync();
        }

        // GET: api/ExportTransactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExportTransactionDto>> GetExportTransaction(Guid id)
        {
            var transaction = await _context.ExportTransactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return new ExportTransactionDto
            {
                Id = transaction.Id,
                Amount = transaction.Amount,
                Currency = transaction.Currency,
                Description = transaction.Description,
                Timestamp = transaction.Timestamp,
                EventId = transaction.EventId,
                EventName = transaction.EventName,
                CategoryId = transaction.CategoryId,
                CategoryName = transaction.CategoryName,
                OrganizationId = transaction.OrganizationId
            };
        }

        // POST: api/ExportTransactions
        [HttpPost]
        public async Task<ActionResult<ExportTransactionDto>> PostExportTransaction(CreateExportTransactionDto createDto)
        {
            var transaction = new Models.ExportTransaction
            {
                Id = Guid.NewGuid(),
                Amount = createDto.Amount,
                Currency = createDto.Currency,
                Description = createDto.Description,
                Timestamp = createDto.Timestamp,
                EventId = createDto.EventId,
                EventName = createDto.EventName,
                CategoryId = createDto.CategoryId,
                CategoryName = createDto.CategoryName,
                OrganizationId = createDto.OrganizationId
            };

            _context.ExportTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            var dto = new ExportTransactionDto
            {
                Id = transaction.Id,
                Amount = transaction.Amount,
                Currency = transaction.Currency,
                Description = transaction.Description,
                Timestamp = transaction.Timestamp,
                EventId = transaction.EventId,
                EventName = transaction.EventName,
                CategoryId = transaction.CategoryId,
                CategoryName = transaction.CategoryName,
                OrganizationId = transaction.OrganizationId
            };

            return CreatedAtAction(nameof(GetExportTransaction), new { id = transaction.Id }, dto);
        }

        // PUT: api/ExportTransactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExportTransaction(Guid id, UpdateExportTransactionDto updateDto)
        {
            var transaction = await _context.ExportTransactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            transaction.Amount = updateDto.Amount;
            transaction.Currency = updateDto.Currency;
            transaction.Description = updateDto.Description;
            transaction.Timestamp = updateDto.Timestamp;
            transaction.CategoryId = updateDto.CategoryId;
            transaction.CategoryName = updateDto.CategoryName;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExportTransactionExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/ExportTransactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExportTransaction(Guid id)
        {
            var transaction = await _context.ExportTransactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.ExportTransactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool ExportTransactionExists(Guid id)
        {
            return _context.ExportTransactions.Any(e => e.Id == id);
        }
    }
}
