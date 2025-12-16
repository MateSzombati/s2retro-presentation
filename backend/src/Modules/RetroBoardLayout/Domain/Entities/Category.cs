namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public ICollection<CategoryValue> Values { get; set; } = [];
}
