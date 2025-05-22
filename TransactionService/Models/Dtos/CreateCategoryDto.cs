namespace TransactionService.Models.Dtos
{
    public class CreateCategoryDto
    {
        public string Name { get; set; } = null!;
        public Guid? ParentCategoryId { get; set; } // optional
    }
}
