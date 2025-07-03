using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace DoApi.Users.Infrastructure
{
    internal sealed class EmailVerificationTokenConfiguration : IEntityTypeConfiguration<EmailVerificationToken>
    {
        public void Configure(EntityTypeBuilder<EmailVerificationToken> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasOne(e => e.User).WithMany().HasForeignKey(e => e.UserId);
        }
    }

}
