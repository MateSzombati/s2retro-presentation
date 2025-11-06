using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoard.Application.DTOs.InstanceCategories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers.RetroBoard;

[ApiController]
[Route("api/[controller]")]
public class InstanceCategoryController(IInstanceCategoryService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstanceCategoryReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var categories = await service.GetAllAsync(cancellationToken);
        return Ok(categories);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InstanceCategoryReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var category = await service.GetByIdAsync(id, cancellationToken);
        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] InstanceCategoryCreateDto dto, CancellationToken cancellationToken)
    {
        var categoryId = await service.CreateAsync(dto, cancellationToken);
        return Ok(categoryId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] InstanceCategoryUpdateDto dto, CancellationToken cancellationToken)
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
