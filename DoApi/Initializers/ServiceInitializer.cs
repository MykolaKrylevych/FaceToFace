using Application.DTO.Input;
using Application.Interfaces;
using Application.Mappers;
using DoApi.Users.Infrastructure;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System.Text;

using DoApi.Users;
using System.Net.Mail;
using System.Net;
using DoApi.Services;
using DoApi.Repositories;
using DoApi.Logging;

namespace DoApi.Initializers
{
    public static partial class ServiceInitializer
    {
        public static IServiceCollection RegisterApplicationServices(this IServiceCollection services)
        {

            RegisterCustomDependencies(services);


            return services;
        }

        public static IServiceCollection ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder => 
            {
                builder.WithOrigins("http://localhost:3000");
            }
            ));
            services.AddControllers();
            
            
            services.AddSingleton<IMapper<MissionInputDto, Mission>, MissionDtoToMissionMapper>();

            services.AddSingleton<PasswordHasher>();
            services.AddSingleton<TokenProvider>();
            services.AddScoped<EmailVerificationLinkFactory>();
            services.AddHttpContextAccessor();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("EmailVerified", policy =>
                {
                    policy.RequireClaim("email_verified", "True");
                });
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.TokenValidationParameters = new TokenValidationParameters{
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!)),
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    ClockSkew = TimeSpan.Zero
                };
            });


            //services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // probably work like this :) i guess
            //builder.Services.AddAutoMapper(typeof(MissionProfile).Assembly);

            //services.AddSingleton(new MapperConfiguration(cfg =>
            //{
            //    cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
            //}).CreateMapper());
            services.AddScoped<IMissionService, MissionService>();
            services.AddScoped<IMissionRepository, MissionRepository>();
            services.AddScoped(typeof(ILoggerAdapter<>), typeof(LoggerAdapter<>));


            services.AddScoped<RegisterUser>();
            services.AddScoped<LoginUser>();
            services.AddScoped<VerifyEmail>();
            services.AddScoped<GetUser>();

            return services;
        }

        public static IServiceCollection AddOpenTelenetryAndJaeger(this IServiceCollection services)
        {
            services.AddOpenTelemetry().WithTracing(tracerProviderBuilder =>
            {
                tracerProviderBuilder
                    .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("DoApi"))
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddOtlpExporter(otlpOptions =>
                    {
                        // change it if u use docker 
                        otlpOptions.Endpoint = new Uri("http://localhost:14268/api/traces");
                    });
                // add Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"] ?? "http://localhost:14268/api/traces" later 
            });


            return services;
        }

        public static IServiceCollection ConfigureEmail(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddFluentEmail(configuration["Email:Username"], configuration["Email:Sender"]).AddSmtpSender(new SmtpClient
            {
                Host = configuration["Email:Host"]!,
                Port = configuration.GetValue<int>("Email:Port"),
                EnableSsl = true,
                Credentials = new NetworkCredential(configuration["Email:Username"], configuration["Email:Secret"]!)
            });

            return services;
        }

        public static IServiceCollection DbContextInitializer(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppDbContext>(options => {
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                options.UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()));
                options.EnableSensitiveDataLogging();
            });

            return services;
        }

        public static IServiceCollection RegisterSwagger(this IServiceCollection services)
        {

            services.AddSwaggerGen(o =>
            {
                o.CustomSchemaIds(id => id.FullName!.Replace('+', '-'));

                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "Enter your JWT token in this field",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    BearerFormat = "JWT"
                };

                o.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);

                var securityRequirement = new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        }
                    },
                    []
                }
            };

                o.AddSecurityRequirement(securityRequirement);
            });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();


            return services;
        }


        private static void RegisterCustomDependencies(IServiceCollection services)
        {
            //services.AddTransient<IChuckNorrisRespositoryAPI, ChuckNorrisRespositoryAPI>(); as example 
        }

    }
}
