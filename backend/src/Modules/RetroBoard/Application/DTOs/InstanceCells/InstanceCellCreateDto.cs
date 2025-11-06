using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;

public record InstanceCellCreateDto(
    int Position,
    string? TextValue,
    double? NumberValue,
    bool? BoolValue,
    DateTime? DateValue,
    Guid RowId,
    Guid? InstanceCategoryValueId,
    InstanceCategoryValueCreateDto? CategoryValue
);
