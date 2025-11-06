namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class InstanceRow
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Position { get; set; }

    public Guid InstanceId { get; set; }
    public required Instance Instance { get; set; }

    public ICollection<InstanceCell> Cells { get; set; } = [];
}
