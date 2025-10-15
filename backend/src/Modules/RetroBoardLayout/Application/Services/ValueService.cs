using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Values;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardValue.Application.Services;

public class ValueService
{
    private readonly IValueRepository _repo;
    private readonly IMapper _mapper;

    public ValueService(IValueRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ReadValueDto?> GetByIdAsync(int id) =>
        _mapper.Map<ReadValueDto>(await _repo.GetByIdAsync(id));

    public async Task<List<ReadValueDto>> GetByCategoryIdAsync(int categoryId) =>
        _mapper.Map<List<ReadValueDto>>(await _repo.GetByCategoryIdAsync(categoryId));

    public async Task<ReadValueDto> CreateAsync(CreateValueDto dto)
    {
        var Value = _mapper.Map<CategoryValue>(dto);
        await _repo.AddAsync(Value);
        await _repo.SaveChangesAsync();
        return _mapper.Map<ReadValueDto>(Value);
    }

    public async Task UpdateAsync(int id, UpdateValueDto dto)
    {
        var Value = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Value not found");
        _mapper.Map(dto, Value);
        _repo.Update(Value);
        await _repo.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var Value = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Value not found");
        _repo.Delete(Value);
        await _repo.SaveChangesAsync();
    }
}
