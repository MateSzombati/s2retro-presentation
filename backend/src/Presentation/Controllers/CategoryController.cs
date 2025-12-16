using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardLayout.Application.DTOs.Categories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;

namespace S2Retro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(ICategoryService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryReadDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var categories = await service.GetAllAsync(cancellationToken);
        return Ok(categories);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CategoryReadDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var category = await service.GetByIdAsync(id, cancellationToken);
        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateAsync([FromBody] CategoryCreateDto dto, CancellationToken cancellationToken)
    {
        var categoryId = await service.CreateAsync(dto, cancellationToken);
        return Ok(categoryId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] CategoryUpdateDto dto, CancellationToken cancellationToken)
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
