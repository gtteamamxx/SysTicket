using Microsoft.EntityFrameworkCore;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using SysTicket.API.Common;
using SysTicket.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSimpleInjector(SimpleInjectorContainer.Container, cfg =>
{
    cfg.AddAspNetCore()
        .AddControllerActivation();

    cfg.AddLogging();
});

builder.Services.AddDbContext<SysTicketContext>(
    options => options.UseSqlServer("name=ConnectionStrings:SysTicket")
);

var app = builder.Build();

app.Services.UseSimpleInjector(SimpleInjectorContainer.Container);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(cfg =>
{
    cfg.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod();
});
app.UseAuthorization();

app.MapControllers();

SimpleInjectorContainer.InitializeContainer();

using (var scope = AsyncScopedLifestyle.BeginScope(SimpleInjectorContainer.Container))
{
    var context = SimpleInjectorContainer.Container.GetInstance<SysTicketContext>();

    context.Database.Migrate();
}

app.Run();
