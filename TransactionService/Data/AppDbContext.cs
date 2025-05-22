using Microsoft.EntityFrameworkCore;
using TransactionService.Models;

namespace TransactionService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Event> Events => Set<Event>();
        public DbSet<UserProfile> UserProfiles => Set<UserProfile>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Transaction
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.Property(t => t.Amount)
                      .HasColumnType("decimal(18,2)")
                      .IsRequired();

                entity.Property(t => t.Currency)
                      .HasMaxLength(3)
                      .IsRequired();

                entity.Property(t => t.Timestamp)
                      .IsRequired();

                entity.HasOne(t => t.Category)
                      .WithMany(c => c.Transactions)
                      .HasForeignKey(t => t.CategoryId)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(t => t.Event)
                      .WithMany(e => e.Transactions)
                      .HasForeignKey(t => t.EventId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            
            // Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Name)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.HasOne(c => c.ParentCategory)
                      .WithMany()
                      .HasForeignKey(c => c.ParentCategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Event
            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Title)
                      .HasMaxLength(200)
                      .IsRequired();

                entity.Property(e => e.Description)
                      .HasMaxLength(1000);

                entity.Property(e => e.EventDate)
                      .IsRequired();
            });

            modelBuilder.Entity<UserProfile>(entity =>
{
    entity.HasKey(u => u.Id);

    entity.Property(u => u.ExternalId)
          .HasMaxLength(100)
          .IsRequired();

    entity.Property(u => u.Email)
          .HasMaxLength(256)
          .IsRequired();

    entity.Property(u => u.DisplayName)
          .HasMaxLength(100)
          .IsRequired();

    entity.HasIndex(u => u.ExternalId).IsUnique();
    entity.HasIndex(u => u.Email).IsUnique();
});

        }
    }
}
