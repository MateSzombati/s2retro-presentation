using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

public interface ICategoryService : IService<CategoryCreateDto, CategoryReadDto, CategoryUpdateDto> { }
