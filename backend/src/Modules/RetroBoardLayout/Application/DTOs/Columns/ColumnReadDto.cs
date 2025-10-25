using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;
using S2Retro.Modules.RetroBoardLayout.Domain.Enums;

namespace S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;

public record ColumnReadDto(
    Guid Id,
    int Position,
    string Name,
    ColumnType Type,
    Guid? CategoryId,
    CategoryReadDto? Category
);
