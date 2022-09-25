using Microsoft.EntityFrameworkCore;

namespace SysTicket.Infrastructure.IntegrationTests.Common
{
    internal class SysTicketInMemoryContext : SysTicketContext
    {
        public SysTicketInMemoryContext() : base()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
        }
    }
}