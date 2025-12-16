using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Layouts;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

public interface ILayoutService : IService<LayoutCreateDto, LayoutReadDto, LayoutUpdateDto> { }
