using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceColumns;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class InstanceColumnController(IInstanceColumnService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstanceColumnReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var columns = await service.GetAllAsync(cancellationToken);
        return Ok(columns);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InstanceColumnReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var column = await service.GetByIdAsync(id, cancellationToken);
        return column is null ? NotFound() : Ok(column);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] InstanceColumnCreateDto dto, CancellationToken cancellationToken)
    {
        var columnId = await service.CreateAsync(dto, cancellationToken);
        return Ok(columnId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] InstanceColumnUpdateDto dto, CancellationToken cancellationToken)
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
