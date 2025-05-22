namespace TransactionService.Models.Dtos
{
    public class CreateAccountDto
    {
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!; // e.g., "Asset", "Liability", etc.
    }
}
