using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategoryValues;

namespace S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;

public record InstanceCategoryReadDto(
    Guid Id,
    string Name,
    List<InstanceCategoryValueReadDto> Values
);
