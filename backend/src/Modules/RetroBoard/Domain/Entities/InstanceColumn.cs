using S2Retro.Modules.RetroBoard.Domain.Enums;

namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class InstanceColumn
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Position { get; set; }
    public required string Name { get; set; }
    public required ColumnType Type { get; set; }

    public Guid InstanceId { get; set; }
    public required Instance Instance { get; set; }

    public Guid? InstanceCategoryId { get; set; }
    public InstanceCategory? Category { get; set; }
}
