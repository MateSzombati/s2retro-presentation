using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;

public record InstanceCellReadDto(
    Guid Id,
    int Position,
    string? TextValue,
    double? NumberValue,
    bool? BoolValue,
    DateTime? DateValue,
    Guid RowId,
    Guid? InstanceCategoryValueId,
    InstanceCategoryValueReadDto? CategoryValue
);
