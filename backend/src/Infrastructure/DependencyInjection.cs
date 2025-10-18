using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using S2Retro.Infrastructure.Data;
using S2Retro.Infrastructure.Data.Repositories;
using S2Retro.Modules.RetroBoardLayout.Application.Interfaces.Repositories;

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

        services.AddScoped<ILayoutRepository, LayoutRepository>();
        services.AddScoped<IColumnRepository, ColumnRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<ICategoryValueRepository, CategoryValueRepository>();

        return services;
    }
}