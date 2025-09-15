using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Columns;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Mapping;

public class ColumnMappingProfile : Profile
{
    public ColumnMappingProfile()
    {
        CreateMap<Column, ReadColumnDto>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category));

        CreateMap<CreateColumnDto, Column>();
        CreateMap<UpdateColumnDto, Column>();
    }
}
