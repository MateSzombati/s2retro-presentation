using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.Boards;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Services;

public class BoardService(IBoardRepository repo, IMapper mapper) : IBoardService
{
    public async Task<IEnumerable<BoardReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var boards = await repo.GetAllAsync(cancellationToken);
        return mapper.Map<IEnumerable<BoardReadDto>>(boards);
    }

    public async Task<BoardReadDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var board = await repo.GetByIdAsync(id, cancellationToken);
        return mapper.Map<BoardReadDto?>(board);
    }

    public async Task<Guid> CreateAsync(BoardCreateDto dto, CancellationToken cancellationToken = default)
    {
        var board = mapper.Map<Board>(dto);
        await repo.AddAsync(board, cancellationToken);
        return board.Id;
    }

    public async Task UpdateAsync(BoardUpdateDto dto, CancellationToken cancellationToken = default)
    {
        var board = mapper.Map<Board>(dto);
        await repo.UpdateAsync(board, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await repo.DeleteAsync(id, cancellationToken);
    }
}
