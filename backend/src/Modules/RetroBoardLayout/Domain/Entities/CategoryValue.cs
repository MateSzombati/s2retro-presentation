namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class CategoryValue
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }

    public Guid CategoryId { get; set; }
    public required Category Category { get; set; }
}
