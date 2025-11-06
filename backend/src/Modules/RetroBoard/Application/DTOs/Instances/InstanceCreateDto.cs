using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;
using S2Retro.Modules.RetroBoard.Domain.Enums;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.Instances;

public record InstanceCreateDto(
    string Name,
    DateTime EntryPhaseStart,
    DateTime? EntryPhaseEnd,
    InstancePhase Phase,
    Guid BoardId,
    List<InstanceColumnCreateDto> Columns,
    List<InstanceRowCreateDto> Rows
);
