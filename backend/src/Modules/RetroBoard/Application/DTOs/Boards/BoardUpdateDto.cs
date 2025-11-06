using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.Boards;

public record BoardUpdateDto(
    Guid Id,
    string Name,
    List<InstanceUpdateDto> Instances
);
