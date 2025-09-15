using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Layouts;

public class ReadLayoutDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool IsArchieved { get; set; }
    public List<ReadColumnDto> Columns { get; set; } = new();
}
