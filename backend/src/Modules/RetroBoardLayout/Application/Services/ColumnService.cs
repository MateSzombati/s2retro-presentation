using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardColumn.Application.Services;

public class ColumnService
{
    private readonly IColumnRepository _repo;
    private readonly IMapper _mapper;

    public ColumnService(IColumnRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ReadColumnDto?> GetByIdAsync(int id) =>
        _mapper.Map<ReadColumnDto>(await _repo.GetByIdAsync(id));

    public async Task<List<ReadColumnDto>> GetByLayoutIdAsync(int layoutId) =>
        _mapper.Map<List<ReadColumnDto>>(await _repo.GetByLayoutIdAsync(layoutId));

    public async Task<ReadColumnDto> CreateAsync(CreateColumnDto dto)
    {
        var Column = _mapper.Map<Column>(dto);
        await _repo.AddAsync(Column);
        await _repo.SaveChangesAsync();
        return _mapper.Map<ReadColumnDto>(Column);
    }

    public async Task UpdateAsync(int id, UpdateColumnDto dto)
    {
        var Column = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Column not found");
        _mapper.Map(dto, Column);
        _repo.Update(Column);
        await _repo.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var Column = await _repo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Column not found");
        _repo.Delete(Column);
        await _repo.SaveChangesAsync();
    }
}
