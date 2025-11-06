using S2Retro.Modules.RetroBoard.Application.DTOs.Boards;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

public interface IBoardService : IService<BoardCreateDto, BoardReadDto, BoardUpdateDto> { }
