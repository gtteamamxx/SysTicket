using SimpleInjector;
using SysTicket.API.Common;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSimpleInjector(SimpleInjectorContainer.Container, cfg =>
{
    cfg.AddAspNetCore()
        .AddControllerActivation();

    cfg.AddLogging();
});

var app = builder.Build();

app.Services.UseSimpleInjector(SimpleInjectorContainer.Container);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

SimpleInjectorContainer.InitializeContainer();

app.Run();
