using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Mapping;

public class ColumnMappingProfile : Profile
{
    public ColumnMappingProfile()
    {
        CreateMap<Column, ColumnReadDto>();
        CreateMap<ColumnCreateDto, Column>();
        CreateMap<ColumnUpdateDto, Column>();
    }
}
