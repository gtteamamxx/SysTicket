using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Repositories
{
    public interface IEventsRepository
    {
        Task CreateEventAsync(Event @event, CancellationToken cancellationToken);
    }
}