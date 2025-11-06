using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IInstanceCategoryValueService : IService<InstanceCategoryValueCreateDto, InstanceCategoryValueReadDto, InstanceCategoryValueUpdateDto> { }
