using Infrastructure.Data;
using DoApi.Users.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Domain.Entities;
using FluentEmail.Core;


namespace DoApi.Users
{
    
internal sealed class RegisterUser(AppDbContext context, PasswordHasher passwordHasher,IFluentEmail fluentEmail, 
                                   EmailVerificationLinkFactory emailVerificationLinkFactory, IConfiguration configuration)
    {
        public sealed record Request(string Email, string FirstName, string LastName, string Password);


        

        public async Task<User> Handle(Request request)
        {
            if (await context.Users.Exists(request.Email))
            {
                //
                //
                // add error handling to return bad request not 500
                throw new Exception("The email is already in use");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = passwordHasher.Hash(request.Password)
            };

            context.Users.Add(user);

            DateTime utcNow = DateTime.UtcNow;
            var verificationToken = new EmailVerificationToken
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                CreatedOnUtc = utcNow,
                ExpiresOnUtc = utcNow.AddDays(1)
            };

            context.EmailVerificationTokens.Add(verificationToken);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
                when (e.InnerException is NpgsqlException { SqlState: PostgresErrorCodes.UniqueViolation })
            {
                throw new Exception("The email is already in use", e);
            }

            // Email verification?
            string verificationLink = emailVerificationLinkFactory.Create(verificationToken);

            await fluentEmail
                .To(configuration["Email:Username"])
                .Subject("Email verification for Face-To-Face App")
                .Body($"To verify {user.Email} email address <a href='{verificationLink}'>click here</a>", isHtml: true)
                .SendAsync();

            return user;
        }
    }
}
