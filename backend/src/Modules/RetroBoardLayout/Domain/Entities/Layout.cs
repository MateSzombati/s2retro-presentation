namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Layout
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public bool IsArchived { get; set; }
    public ICollection<Column> Columns { get; set; } = [];
}
