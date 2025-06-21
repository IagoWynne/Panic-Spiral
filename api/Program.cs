using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using PanicSpiral.API.Game;
using PanicSpiral.API.Leaderboard;
using PanicSpiral.API.Model.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("PanicSpiralContext");

if (connectionString == null)
{
    throw new NullReferenceException(nameof(connectionString));
}

builder.Services.AddDbContextPool<PanicSpiralContext>(opt =>
    opt.UseNpgsql(
        string.Format(
            connectionString,
            builder.Configuration["API_DATABASE_PORT"],
            builder.Configuration["POSTGRES_DATABASE"],
            builder.Configuration["API_DATABASE_USER"],
            builder.Configuration["API_DATABASE_PASSWORD"])));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    using var scope = app.Services.CreateScope();

    var context = scope.ServiceProvider.GetRequiredService<PanicSpiralContext>();

    if (context?.Database.GetPendingMigrations().Any() ?? false)
    {
        context.Database.Migrate();
    }
}

app.UseHttpsRedirection();

app.MapLeaderboardEndpoints();
app.MapGameEndpoints();

app.Run();
