using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Values;

namespace S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Categories;

public class CreateCategoryDto
{
    public string Name { get; set; } = null!;
    public List<CreateValueDto> Values { get; set; } = new();
}
