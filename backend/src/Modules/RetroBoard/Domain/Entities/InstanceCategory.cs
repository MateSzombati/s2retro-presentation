namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class InstanceCategory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }

    public ICollection<InstanceCategoryValue> Values { get; set; } = [];
}
