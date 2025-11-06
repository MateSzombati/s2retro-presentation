using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IInstanceService : IService<InstanceCreateDto, InstanceReadDto, InstanceUpdateDto> { }
