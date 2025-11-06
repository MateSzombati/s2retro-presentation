using S2Retro.Modules.RetroBoard.Domain.Enums;

namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class Instance
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public bool IsArchived { get; set; }

    public DateTime EntryPhaseStart { get; set; } = DateTime.UtcNow;
    public DateTime? EntryPhaseEnd { get; set; }
    public required InstancePhase Phase { get; set; }

    public Guid BoardId { get; set; }
    public required Board Board { get; set; }

    public ICollection<InstanceColumn> Columns { get; set; } = [];
    public ICollection<InstanceRow> Rows { get; set; } = [];
}
