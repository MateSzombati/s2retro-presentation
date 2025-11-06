using Microsoft.Extensions.DependencyInjection;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Services;
using S2Retro.Modules.RetroBoard.Application.Mapping;
using S2Retro.Modules.RetroBoard.Application.Services;

namespace S2Retro.Modules.RetroBoard.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddRetroBoardApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg => cfg.AddProfile<BoardMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<InstanceMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<InstanceColumnMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<InstanceRowMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<InstanceCellMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<InstanceCategoryMappingProfile>());
        services.AddAutoMapper(cfg => cfg.AddProfile<InstanceCategoryValueMappingProfile>());

        services.AddScoped<IBoardService, BoardService>();
        services.AddScoped<IInstanceService, InstanceService>();
        services.AddScoped<IInstanceColumnService, InstanceColumnService>();
        services.AddScoped<IInstanceRowService, InstanceRowService>();
        services.AddScoped<IInstanceCellService, InstanceCellService>();
        services.AddScoped<IInstanceCategoryService, InstanceCategoryService>();
        services.AddScoped<IInstanceCategoryValueService, InstanceCategoryValueService>();

        return services;
    }
}
