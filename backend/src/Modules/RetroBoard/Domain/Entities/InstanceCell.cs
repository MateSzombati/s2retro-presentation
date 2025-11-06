namespace S2Retro.Modules.RetroBoard.Domain.Entities;

public class InstanceCell
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Position { get; set; }
    public string? TextValue { get; set; }
    public double? NumberValue { get; set; }
    public bool? BoolValue { get; set; }
    public DateTime? DateValue { get; set; }

    public Guid RowId { get; set; }
    public required InstanceRow Row { get; set; }

    public Guid? InstanceCategoryValueId { get; set; }
    public InstanceCategoryValue? CategoryValue { get; set; }
}
