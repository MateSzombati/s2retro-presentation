using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;

public record InstanceRowReadDto(
    Guid Id,
    int Position,
    Guid InstanceId,
    List<InstanceCellReadDto> Cells
);
