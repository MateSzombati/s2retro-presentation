using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IInstanceColumnService : IService<InstanceColumnCreateDto, InstanceColumnReadDto, InstanceColumnUpdateDto> { }
