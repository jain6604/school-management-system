using Microsoft.EntityFrameworkCore;
using StudentAPI.Models;

namespace StudentAPI.Data
{
    public class AppDbContext : DbContext
    {
        // Constructor (connects options)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Table in database
        public DbSet<Student> Students { get; set; }
    }
}