namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Column
{
    public int Id { get; set; }
    public int Position { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int LayoutId { get; set; }
    public Layout Layout { get; set; } = null!;
    public int? CategoryId { get; set; }
    public Category? Category { get; set; }
}
