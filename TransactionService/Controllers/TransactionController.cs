using Microsoft.AspNetCore.Mvc;
using TransactionService.Data;
using TransactionService.Models;
using TransactionService.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace TransactionService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionDto dto)
        {
            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                Amount = dto.Amount,
                Currency = dto.Currency,
                Description = dto.Description,
                Timestamp = dto.Timestamp,
                CategoryId = dto.CategoryId,
                EventId = dto.EventId,
                UserProfileId = dto.UserProfileId
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.Id }, transaction);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            return transaction == null ? NotFound() : Ok(transaction);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions);
        }
    }
}
