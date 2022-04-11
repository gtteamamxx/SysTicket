namespace SysTicket.Domain.Interfaces.Common
{
    public interface ISysTicketUnitOfWork
    {
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
