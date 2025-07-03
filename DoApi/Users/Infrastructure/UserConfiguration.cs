using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace DoApi.Users.Infrastructure
{
    internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.FirstName).HasMaxLength(200);
            builder.Property(u => u.LastName).HasMaxLength(200);
            builder.Property(u => u.Email).HasMaxLength(300);
            builder.Property(u => u.PasswordHash).IsRequired();

            builder.HasIndex(u => u.Email).IsUnique();
        }
    }

}
