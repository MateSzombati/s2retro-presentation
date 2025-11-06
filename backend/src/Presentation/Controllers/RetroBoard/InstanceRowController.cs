using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceRows;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class InstanceRowController(IInstanceRowService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstanceRowReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var rows = await service.GetAllAsync(cancellationToken);
        return Ok(rows);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InstanceRowReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var row = await service.GetByIdAsync(id, cancellationToken);
        return row is null ? NotFound() : Ok(row);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] InstanceRowCreateDto dto, CancellationToken cancellationToken)
    {
        var rowId = await service.CreateAsync(dto, cancellationToken);
        return Ok(rowId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] InstanceRowUpdateDto dto, CancellationToken cancellationToken)
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
