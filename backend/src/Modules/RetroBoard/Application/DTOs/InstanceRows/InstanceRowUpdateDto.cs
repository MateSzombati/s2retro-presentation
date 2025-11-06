using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;

public record InstanceRowUpdateDto(
    Guid Id,
    int Position,
    Guid InstanceId,
    List<InstanceCellUpdateDto> Cells
);
