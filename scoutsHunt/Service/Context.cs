using Microsoft.EntityFrameworkCore;
using scoutsHunt.Models;

namespace scoutsHunt.Service
{
    public class Context : DbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Hiker> Hikers { get; set; }
        public DbSet<Spot> Spots { get; set; }
        
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public async void Save()
        {
            await SaveChangesAsync();
        } 
    }
}