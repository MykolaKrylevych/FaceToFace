using DoApi.Initializers;
using DoApi.Users;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.RegisterApplicationServices();
builder.Services.DbContextInitializer(builder.Configuration);


builder.Services.ConfigureEmail(builder.Configuration);

// Add services to the container.
builder.Services.ConfigureServices(builder.Configuration);
builder.Services.RegisterSwagger();

//builder.Services.AddOpenTelenetryAndJaeger();


//var startup = new Startup(builder.Configuration);

builder.Services.AddOpenApi();


var app = builder.Build();

Console.WriteLine(app.Environment.IsDevelopment());



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

    app.ApplyMigrations(); // <- custom extensions method to create migrations 
    app.MapOpenApi();
    app.UseSwagger(); // <!-- this line for swagger
    app.UseSwaggerUI(); // <!-- this line for swagger

}

app.ConfigureMiddleware();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// including user endpoints
 UserEndpoints.Map(app);

app.Run();
