using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Categories;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;

public class ReadColumnDto
{
    public int Id { get; set; }
    public int Position { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public ReadCategoryDto? Category { get; set; }
}
