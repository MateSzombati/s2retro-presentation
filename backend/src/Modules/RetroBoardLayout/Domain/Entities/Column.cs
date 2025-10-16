using S2Retro.Modules.RetroBoardLayout.Domain.Enums;

namespace S2Retro.Modules.RetroBoardLayout.Domain.Entities;

public class Column
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Position { get; set; }
    public required string Name { get; set; }
    public required ColumnType Type { get; set; }

    public Guid LayoutId { get; set; }
    public required Layout Layout { get; set; }

    public Guid? CategoryId { get; set; }
    public Category? Category { get; set; }
}
