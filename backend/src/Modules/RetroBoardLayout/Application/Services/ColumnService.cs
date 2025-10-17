using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Services;

public class ColumnService(IColumnRepository columnRepository, IMapper mapper) : IColumnService
{
    public async Task<IEnumerable<ColumnReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var columns = await columnRepository.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<ColumnReadDto>>(columns);
    }

    public async Task<ColumnReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var column = await columnRepository.GetByIdAsync(id, cancellationToken);
        return mapper.Map<ColumnReadDto?>(column);
    }

    public async Task<Guid> CreateAsync(ColumnCreateDto dto, CancellationToken cancellationToken = default)
    {
        var column = mapper.Map<Column>(dto);
        await columnRepository.AddAsync(column, cancellationToken);
        return column.Id;
    }

    public async Task UpdateAsync(ColumnUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var column = mapper.Map<Column>(dto);
        await columnRepository.UpdateAsync(column, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await columnRepository.DeleteAsync(id, cancellationToken);
    }
}
