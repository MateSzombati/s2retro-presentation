namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class Board
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }

    public ICollection<Instance> Instances { get; set; } = [];
}
