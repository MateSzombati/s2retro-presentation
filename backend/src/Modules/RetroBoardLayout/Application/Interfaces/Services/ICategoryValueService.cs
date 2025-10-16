using S2Retro.Modules.RetroBoardLayout.Application.DTOs.CategoryValues;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

public interface ICategoryValueService : IService<CategoryValueCreateDto, CategoryValueReadDto, CategoryValueUpdateDto> { }
