using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IInstanceRowService : IService<InstanceRowCreateDto, InstanceRowReadDto, InstanceRowUpdateDto> { }
