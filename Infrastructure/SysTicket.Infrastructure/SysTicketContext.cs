using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using SysTicket.Domain.Entities;

namespace SysTicket.Infrastructure
{
    [ExcludeFromCodeCoverage]
    public class SysTicketContext : DbContext
    {
        public SysTicketContext(DbContextOptions<SysTicketContext> options) : base(options)
        {
        }

        protected SysTicketContext()
        { }

        public virtual DbSet<EventPrice> EventPrices { get; set; } = default!;

        public virtual DbSet<Event> Events { get; set; } = default!;

        public virtual DbSet<User> Users { get; set; } = default!;
    }
}