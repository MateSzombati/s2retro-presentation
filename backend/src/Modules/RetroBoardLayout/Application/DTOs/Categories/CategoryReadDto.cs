using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;

namespace S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;

public record CategoryReadDto(
    Guid Id,
    string Name,
    List<CategoryValueReadDto> Values
);
