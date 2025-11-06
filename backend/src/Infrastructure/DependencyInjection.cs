using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using S2Retro.Infrastructure.Data;
using S2Retro.Infrastructure.Data.Repositories;
using S2Retro.Modules.RetroBoard.Application.Interfaces.Repositories;

namespace S2Retro.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<S2RetroDbContext>(options =>
            options.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString)
            ));

        services.AddScoped<IBoardRepository, BoardRepository>();
        services.AddScoped<IInstanceRepository, InstanceRepository>();
        services.AddScoped<IInstanceColumnRepository, InstanceColumnRepository>();
        services.AddScoped<IInstanceRowRepository, InstanceRowRepository>();
        services.AddScoped<IInstanceCellRepository, InstanceCellRepository>();
        services.AddScoped<IInstanceCategoryRepository, InstanceCategoryRepository>();
        services.AddScoped<IInstanceCategoryValueRepository, InstanceCategoryValueRepository>();

        return services;
    }
}
