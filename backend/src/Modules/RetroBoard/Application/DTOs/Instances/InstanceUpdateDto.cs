using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;
using S2Retro.Modules.RetroBoard.Domain.Enums;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.Instances;

public record InstanceUpdateDto(
    Guid Id,
    string Name,
    bool IsArchived,
    DateTime EntryPhaseStart,
    DateTime? EntryPhaseEnd,
    InstancePhase Phase,
    Guid BoardId,
    List<InstanceColumnUpdateDto> Columns,
    List<InstanceRowUpdateDto> Rows
);
