using SysTicket.Domain.Interfaces.Common;

namespace SysTicket.Infrastructure
{
    internal class SysTicketUnitOfWork : ISysTicketUnitOfWork
    {
        private readonly SysTicketContext _sysTicketContext;

        public SysTicketUnitOfWork(SysTicketContext sysTicketContext)
        {
            _sysTicketContext = sysTicketContext;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _sysTicketContext.SaveChangesAsync(cancellationToken);
        }
    }
}