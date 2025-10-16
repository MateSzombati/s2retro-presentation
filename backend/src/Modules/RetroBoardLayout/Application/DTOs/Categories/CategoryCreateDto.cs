using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;

namespace S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;

public record CategoryCreateDto(
    string Name,
    List<CategoryValueCreateDto> Values
);
