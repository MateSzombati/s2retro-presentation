using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCells;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IInstanceCellService : IService<InstanceCellCreateDto, InstanceCellReadDto, InstanceCellUpdateDto> { }
