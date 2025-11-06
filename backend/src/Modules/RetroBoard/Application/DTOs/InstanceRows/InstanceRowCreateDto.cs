using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;

public record InstanceRowCreateDto(
    int Position,
    Guid InstanceId,
    List<InstanceCellCreateDto> Cells
);
