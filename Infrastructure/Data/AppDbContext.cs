using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Threading.Channels;


namespace Infrastructure.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Mission> Missions { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<EmailVerificationToken> EmailVerificationTokens { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Console.WriteLine("DELETE THIS ON PRODUCTION OnConfiguring AppDbContext Infrastructure.Data");
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }


        // get all configurations(Infrastructure/Configurations) from assembly but theoretically should try :)
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.HasPostgresEnum("mission_status", Enum.GetNames(typeof(MissionTypeEnum)));

            modelBuilder
                .Entity<Mission>()
                .Property(t => t.MissionType)
                .HasConversion(
                v => v.ToString(),
                v => (MissionTypeEnum)Enum.Parse(typeof(MissionTypeEnum), v));
            //.HasColumnType("mission_status");

            modelBuilder
                .Entity<Mission>()
                .Property(t => t.Status)
                .HasConversion(
                v => v.ToString(),
                v => (MissionApprovementStatusEnum)Enum.Parse(typeof(MissionApprovementStatusEnum), v)
                )
               .HasDefaultValue(MissionApprovementStatusEnum.pending);


            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            base.OnModelCreating(modelBuilder);

        }
    }
}
