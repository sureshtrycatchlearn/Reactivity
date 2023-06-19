using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using Application.Interfaces;
using Infrastructure.Security;
using Application.Core;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions 
    {
        public static IServiceCollection AddApplicationservices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen();
                services.AddDbContext<DataContext>(opt=>{
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                }); 

                services.AddCors(opt=>{
                    opt.AddPolicy("CorsPolicy", policy=>
                    {
                        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                    });
                });
                services.AddMediatR(typeof(List.Handler));

                services.AddAutoMapper(typeof(MappingProfiles).Assembly);
                services.AddFluentValidationAutoValidation();
                services.AddValidatorsFromAssemblyContaining<Create>();
                services.AddHttpContextAccessor();
                services.AddScoped<IUserAccessor, UserAccessor>();
                

                return services;
        }
    }
}