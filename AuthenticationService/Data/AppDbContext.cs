using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using AuthenticationService.Models;

namespace AuthenticationService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                
                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasDefaultValueSql("gen_random_uuid()");
                
                entity.Property(e => e.DisplayName)
                    .IsRequired()
                    .HasMaxLength(100);
                
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256);
                
                entity.Property(e => e.KeycloakId)
                    .IsRequired();
                
                entity.Property(e => e.CreatedAt)
                    .IsRequired()
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValue(null);
                
                entity.HasIndex(e => e.Email)
                    .IsUnique();
                
                entity.HasIndex(e => e.KeycloakId)
                    .IsUnique();
            });
        }
    }
}
