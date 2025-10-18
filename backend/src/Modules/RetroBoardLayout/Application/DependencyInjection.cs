using Microsoft.Extensions.DependencyInjection;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoardLayout.Application.Mapping;
using S2Retro.Modules.RetroBoardLayout.Application.Services;

namespace S2Retro.Modules.RetroBoardLayout.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddRetroBoardLayoutApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg => cfg.AddProfile<LayoutMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<ColumnMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<CategoryMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<CategoryValueMappingProfile>());

        services.AddScoped<ILayoutService, LayoutService>();
        services.AddScoped<IColumnService, ColumnService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICategoryValueService, CategoryValueService>();

        return services;
    }
}