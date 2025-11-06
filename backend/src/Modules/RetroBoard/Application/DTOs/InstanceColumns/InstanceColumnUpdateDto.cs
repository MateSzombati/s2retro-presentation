using S2Retro.Modules.RetroBoard.Domain.Enums;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;

public record InstanceColumnUpdateDto(
    Guid Id,
    int Position,
    string Name,
    ColumnType Type,
    Guid InstanceId,
    Guid? InstanceCategoryId,
    InstanceCategoryUpdateDto? Category
);
