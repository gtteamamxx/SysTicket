using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Infrastructure.Repositories
{
    internal class EventsRepository : IEventsRepository
    {
        private readonly SysTicketContext _context;

        public EventsRepository(SysTicketContext context)
        {
            _context = context;
        }

        public async Task CreateEventAsync(Event @event, CancellationToken cancellationToken)
            => await _context.Events.AddAsync(@event, cancellationToken);
    }
}