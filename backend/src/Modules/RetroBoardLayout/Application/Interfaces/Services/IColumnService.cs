using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;
using S2Retro.Shared.Kernel.Interfaces;

namespace S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

public interface IColumnService : IService<ColumnCreateDto, ColumnReadDto, ColumnUpdateDto> { }
