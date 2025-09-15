using Microsoft.AspNetCore.Mvc;
using S2Retro.Modules.RetroBoardLayout.Contracts.DTOs.Values;
using S2Retro.Modules.RetroBoardValue.Application.Services;

namespace S2Retro.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ValueController : ControllerBase
{
    private readonly ValueService _service;

    public ValueController(ValueService service)
    {
        _service = service;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ReadValueDto>> GetById(int id)
    {
        var value = await _service.GetByIdAsync(id);
        if (value == null) return NotFound();
        return Ok(value);
    }

    [HttpPost]
    public async Task<ActionResult<ReadValueDto>> Create(CreateValueDto dto)
    {
        var value = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = value.Id }, value);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateValueDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
