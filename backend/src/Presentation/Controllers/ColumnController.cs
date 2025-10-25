using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Columns;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ColumnController(IColumnService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ColumnReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var columns = await service.GetAllAsync(cancellationToken);
        return Ok(columns);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ColumnReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var column = await service.GetByIdAsync(id, cancellationToken);
        return column is null ? NotFound() : Ok(column);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] ColumnCreateDto dto, CancellationToken cancellationToken)
    {
        var columnId = await service.CreateAsync(dto, cancellationToken);
        return Ok(columnId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] ColumnUpdateDto dto, CancellationToken cancellationToken)
    {
        await service.UpdateAsync(dto, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        await service.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
