using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.Boards;

public record BoardReadDto(
    Guid Id,
    string Name,
    List<InstanceReadDto> Instances
);
