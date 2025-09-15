namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;

public class UpdateColumnDto
{
    public int Position { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int? CategoryId { get; set; }
}
