using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Values;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Categories;

public class ReadCategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<ReadValueDto> Values { get; set; } = new();
}
