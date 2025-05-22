namespace TransactionService.Models.Dtos
{
    public class CreateEventDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime EventDate { get; set; }
    }
}
