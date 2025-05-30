using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionService.Data;
using TransactionService.Models;
using TransactionService.Models.Dtos;

namespace TransactionService.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        private string GetUserId()
        {
            // Get the user ID from the HttpContext items that was set by our JwtMiddleware
            var userId = HttpContext.Items["sub"] as string;
            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return userId;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionDto dto)
        {
            var userId = GetUserId();
            
            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                Amount = dto.Amount,
                Currency = dto.Currency,
                Description = dto.Description,
                Timestamp = dto.Timestamp,
                CategoryId = dto.CategoryId,
                EventId = dto.EventId,
                UserId = userId
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
        public async Task<IActionResult> GetAllTransactions(bool includeDeleted = false)
        {
            var userId = GetUserId();

            var query = _context.Transactions
                .Where(t => t.UserId == userId);
            
            if (!includeDeleted)
            {
                query = query.Where(t => !t.IsDeleted);
            }
            
            var transactions = await query.ToListAsync();
            return Ok(transactions);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id, [FromQuery] bool permanent = false)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null || (transaction.IsDeleted && !permanent))
            {
                return NotFound();
            }

            if (permanent)
            {
                // Perform hard delete
                _context.Transactions.Remove(transaction);
            }
            else
            {
                // Perform soft delete
                var userId = GetUserId();
                transaction.IsDeleted = true;
                transaction.DeletedAt = DateTime.UtcNow;
                transaction.DeletedBy = userId;
                _context.Transactions.Update(transaction);
            }

            await _context.SaveChangesAsync();
            
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(Guid id, [FromBody] UpdateTransactionDto dto)
        {
            var userId = GetUserId();
            
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null || transaction.IsDeleted)
            {
                return NotFound();
            }

            // Ensure the user owns the transaction
            if (transaction.UserId != userId)
            {
                return Forbid();
            }

            // Update only the fields that are allowed to be updated
            transaction.Amount = dto.Amount;
            transaction.Currency = dto.Currency;
            transaction.Description = dto.Description;
            transaction.CategoryId = dto.CategoryId;
            transaction.EventId = dto.EventId;
            transaction.Timestamp = dto.Timestamp;
            
            // Update audit fields
            transaction.UpdatedAt = DateTime.UtcNow;
            transaction.UpdatedBy = userId;
            
            // Handle soft delete if requested
            if (dto.IsDeleted.HasValue && dto.IsDeleted.Value)
            {
                transaction.IsDeleted = true;
                transaction.DeletedAt = DateTime.UtcNow;
                transaction.DeletedBy = dto.DeletedBy ?? userId; // Use userId from JWT token
            }
            else if (dto.IsDeleted.HasValue && !dto.IsDeleted.Value && transaction.IsDeleted)
            {
// Handle un-delete
                transaction.IsDeleted = false;
                transaction.DeletedAt = null;
                transaction.DeletedBy = null;
            }

            await _context.SaveChangesAsync();
            
            return Ok(transaction);
        }
    }
}
