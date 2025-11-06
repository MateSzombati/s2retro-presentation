namespace S2Retro.Shared.Kernel.Interfaces;

public interface IService<TCreateDto, TReadDto, TUpdateDto>
{
    Task<IEnumerable<TReadDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Guid> CreateAsync(TCreateDto dto, CancellationToken cancellationToken = default);
    Task UpdateAsync(TUpdateDto dto, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}