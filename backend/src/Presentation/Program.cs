using S2Retro.Infrastructure;
using S2Retro.Modules.RetroBoard.Application;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddInfrastructure(builder.Configuration);
services.AddRetroBoardApplication();

services.AddControllers();

var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
var allowCredentials = configuration.GetValue<bool>("Cors:AllowCredentials");
var allowedHeaders = configuration.GetSection("Cors:AllowedHeaders").Get<string[]>() ?? [];
var allowedMethods = configuration.GetSection("Cors:AllowedMethods").Get<string[]>() ?? [];

services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        if (allowedOrigins is ["*"])
        {
            policy
                .AllowAnyOrigin()
                .WithHeaders(allowedHeaders)
                .WithMethods(allowedMethods)
                .DisallowCredentials();
        }
        else
        {
            policy
                .WithOrigins(allowedOrigins)
                .WithHeaders(allowedHeaders)
                .WithMethods(allowedMethods);

            if (allowCredentials)
                policy.AllowCredentials();
            else
                policy.DisallowCredentials();
        }
    });
});

var swaggerEnabled = configuration.GetValue<bool>("Swagger:Enabled");

if (swaggerEnabled)
{
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    if (swaggerEnabled)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.MapControllers();

app.Run();