using EventService.Models;

namespace EventService.Data
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetTransactionsByEventIdAsync(int eventId);
        Task<Transaction?> GetTransactionByIdAsync(int id);
        Task<Transaction> CreateTransactionAsync(Transaction transaction);
        Task UpdateTransactionAsync(Transaction transaction);
        Task DeleteTransactionAsync(int id);
        Task<decimal> GetTotalIncomeAsync(int eventId);
        Task<decimal> GetTotalExpensesAsync(int eventId);
        Task<bool> SaveChangesAsync();
    }
}
