using System;
using System.Collections.Generic;

namespace TransactionService.Models
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!; // e.g. "Asset", "Liability", etc.

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
