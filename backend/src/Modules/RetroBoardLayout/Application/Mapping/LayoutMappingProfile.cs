using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Layouts;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Mapping;

public class LayoutMappingProfile : Profile
{
    public LayoutMappingProfile()
    {
        CreateMap<Layout, ReadLayoutDto>()
            .ForMember(dest => dest.Columns, opt => opt.MapFrom(src => src.Columns));

        CreateMap<CreateLayoutDto, Layout>();
        CreateMap<UpdateLayoutDto, Layout>();
    }
}
