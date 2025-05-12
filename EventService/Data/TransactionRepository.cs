using Microsoft.EntityFrameworkCore;
using EventService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace EventService.Data
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByEventIdAsync(int eventId)
        {
            return await _context.Transactions
                .Where(t => t.EventId == eventId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        public async Task<Transaction?> GetTransactionByIdAsync(int id)
        {
            return await _context.Transactions.FindAsync(id);
        }

        public async Task<Transaction> CreateTransactionAsync(Transaction transaction)
        {
            if (transaction == null)
            {
                throw new ArgumentNullException(nameof(transaction));
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task UpdateTransactionAsync(Transaction transaction)
        {
            transaction.UpdatedAt = DateTime.UtcNow;
            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTransactionAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction != null)
            {
                _context.Transactions.Remove(transaction);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<decimal> GetTotalIncomeAsync(int eventId)
        {
            return await _context.Transactions
                .Where(t => t.EventId == eventId && t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount);
        }

        public async Task<decimal> GetTotalExpensesAsync(int eventId)
        {
            return await _context.Transactions
                .Where(t => t.EventId == eventId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
