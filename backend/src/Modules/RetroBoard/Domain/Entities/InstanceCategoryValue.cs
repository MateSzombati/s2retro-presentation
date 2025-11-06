namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class InstanceCategoryValue
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }

    public Guid InstanceCategoryId { get; set; }
    public required InstanceCategory Category { get; set; }
}
