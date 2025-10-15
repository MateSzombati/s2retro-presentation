using AutoMapper;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Values;
using S2Retro.Modules.RetroBoardLayout.Domain.Entities;

namespace S2Retro.Modules.RetroBoardLayout.Application.Mapping;

public class ValueMappingProfile : Profile
{
    public ValueMappingProfile()
    {
        CreateMap<CategoryValue, ReadValueDto>();
        CreateMap<CreateValueDto, CategoryValue>();
        CreateMap<UpdateValueDto, CategoryValue>();
    }
}
