using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.Instances;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class InstanceController(IInstanceService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstanceReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var instances = await service.GetAllAsync(cancellationToken);
        return Ok(instances);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InstanceReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var instance = await service.GetByIdAsync(id, cancellationToken);
        return instance is null ? NotFound() : Ok(instance);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] InstanceCreateDto dto, CancellationToken cancellationToken)
    {
        var instanceId = await service.CreateAsync(dto, cancellationToken);
        return Ok(instanceId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] InstanceUpdateDto dto, CancellationToken cancellationToken)
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
