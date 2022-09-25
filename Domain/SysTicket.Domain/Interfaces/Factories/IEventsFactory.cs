using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Domain.Events;

namespace SysTicket.Domain.Interfaces.Factories
{
    public interface IEventsFactory
    {
        Task<Event> CreateEventAsync(ICreateEvent input, CancellationToken cancellationToken);
    }
}