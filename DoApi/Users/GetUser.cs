using Infrastructure.Data;


namespace DoApi.Users
{
    internal sealed class GetUser(AppDbContext context)
    {
        public sealed record UserResponse(Guid Id, string FirstName, string LastName, string Email, bool EmailVerified);

        public async Task<UserResponse?> Handle(Guid userId)
        {
            UserResponse? user = context.Users
                .Where(u => u.Id == userId)
                .Select(u => new UserResponse(u.Id, u.FirstName, u.LastName, u.Email, u.EmailVerified))
                .SingleOrDefault();

            return user;
        }
    }
}
