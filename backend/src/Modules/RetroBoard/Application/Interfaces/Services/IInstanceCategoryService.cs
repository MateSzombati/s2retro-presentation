using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IInstanceCategoryService : IService<InstanceCategoryCreateDto, InstanceCategoryReadDto, InstanceCategoryUpdateDto> { }
