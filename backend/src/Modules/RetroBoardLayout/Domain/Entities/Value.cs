namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Value
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
