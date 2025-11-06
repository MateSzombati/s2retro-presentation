using AutoMapper;
using S2Retro.Modules.RetroBoard.Application.DTOs.Boards;
using S2Retro.Modules.RetroBoard.Domain.Entities;

namespace S2Retro.Modules.RetroBoard.Application.Mapping;

public class BoardMappingProfile : Profile
{
    public BoardMappingProfile()
    {
        CreateMap<Board, BoardReadDto>();
        CreateMap<BoardCreateDto, Board>();
        CreateMap<BoardUpdateDto, Board>();
    }
}
