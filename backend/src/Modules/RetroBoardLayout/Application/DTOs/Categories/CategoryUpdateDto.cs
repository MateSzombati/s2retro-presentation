using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;

namespace S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;

public record CategoryUpdateDto(
    Guid Id,
    string Name,
    List<CategoryValueUpdateDto> Values
);
