using Microsoft.EntityFrameworkCore;
using S2Retro.Infrastructure.Data;
using S2Retro.Infrastructure.Data.Repositories;
using S2Retro.Modules.RetroBoardCategory.Application.Services;
using S2Retro.Modules.RetroBoardColumn.Application.Services;
using S2Retro.Modules.RetroBoardLayout.Application.Mapping;
using S2Retro.Modules.RetroBoardLayout.Application.Services;
using S2Retro.Modules.RetroBoardLayout.Contracts.Repositories;
using S2Retro.Modules.RetroBoardValue.Application.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");

builder.Services.AddDbContext<S2RetroDbContext>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 4, 0))
        )
    );

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<LayoutMappingProfile>());
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<ColumnMappingProfile>());
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<CategoryMappingProfile>());
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<ValueMappingProfile>());

builder.Services.AddScoped<ILayoutRepository, LayoutRepository>();
builder.Services.AddScoped<IColumnRepository, ColumnRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IValueRepository, ValueRepository>();

builder.Services.AddScoped<LayoutService>();
builder.Services.AddScoped<ColumnService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ValueService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
