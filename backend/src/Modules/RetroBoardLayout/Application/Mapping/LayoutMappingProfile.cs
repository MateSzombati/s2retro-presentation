using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Layouts;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Mapping;

public class LayoutMappingProfile : Profile
{
    public LayoutMappingProfile()
    {
        CreateMap<Layout, LayoutReadDto>();
        CreateMap<LayoutCreateDto, Layout>();
        CreateMap<LayoutUpdateDto, Layout>();
    }
}
