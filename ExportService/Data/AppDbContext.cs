using Microsoft.EntityFrameworkCore;
using ExportService.Models;

namespace ExportService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ExportEvent> ExportEvents { get; set; }
        public DbSet<ExportTransaction> ExportTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ExportEvent entity
            modelBuilder.Entity<ExportEvent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
                
                entity.Property(e => e.Date)
                    .IsRequired();
                    
                entity.HasIndex(e => e.OrganizationId);
                
                // Configure table name and schema if needed
                entity.ToTable("ExportEvents", "export");
            });

            // Configure ExportTransaction entity
            modelBuilder.Entity<ExportTransaction>(entity =>
            {
                entity.HasKey(t => t.Id);
                
                entity.Property(t => t.Currency)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsFixedLength(true);
                    
                entity.Property(t => t.Description)
                    .HasMaxLength(500);
                    
                entity.Property(t => t.EventName)
                    .IsRequired()
                    .HasMaxLength(200);
                    
                entity.Property(t => t.CategoryName)
                    .HasMaxLength(200);
                
                // Indexes for better query performance
                entity.HasIndex(t => t.EventId);
                entity.HasIndex(t => t.CategoryId);
                entity.HasIndex(t => t.Timestamp);
                
                // Configure table name and schema if needed
                entity.ToTable("ExportTransactions", "export");
            });
        }
    }
}