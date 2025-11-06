using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.Boards;

public record BoardCreateDto(
    string Name,
    List<InstanceCreateDto> Instances
);
