using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Categories;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardCategory.Application.Services;

public class CategoryService
{
    private readonly ICategoryRepository _repo;
    private readonly IMapper _mapper;

    public CategoryService(ICategoryRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ReadCategoryDto?> GetByIdAsync(int id) =>
        _mapper.Map<ReadCategoryDto>(await _repo.GetByIdAsync(id));

    public async Task<List<ReadCategoryDto>> GetAllAsync() =>
        _mapper.Map<List<ReadCategoryDto>>(await _repo.GetAllAsync());

    public async Task<ReadCategoryDto> CreateAsync(CreateCategoryDto dto)
    {
        var Category = _mapper.Map<Category>(dto);
        await _repo.AddAsync(Category);
        await _repo.SaveChangesAsync();
        return _mapper.Map<ReadCategoryDto>(Category);
    }

    public async Task UpdateAsync(int id, UpdateCategoryDto dto)
    {
        var Category = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Category not found");
        _mapper.Map(dto, Category);
        _repo.Update(Category);
        await _repo.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var Category = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Category not found");
        _repo.Delete(Category);
        await _repo.SaveChangesAsync();
    }
}
