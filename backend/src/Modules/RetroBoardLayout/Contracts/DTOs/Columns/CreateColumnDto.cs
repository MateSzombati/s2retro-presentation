namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;

public class CreateColumnDto
{
    public int Position { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int? CategroyId { get; set; }
}
