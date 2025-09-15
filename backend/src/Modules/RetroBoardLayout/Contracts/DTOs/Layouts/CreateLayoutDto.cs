using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Layouts;
public class CreateLayoutDto
{
    public string Name { get; set; } = null!;
    public List<CreateColumnDto> Columns { get; set; } = new();
}
