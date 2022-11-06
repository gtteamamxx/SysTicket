using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Event>> GetAllEventsByPaginationAsync(int pageIndex, int pageSize, CancellationToken cancellationToken)
            => await _context.Events
                .OrderByDescending(x => x.DateFrom)
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .Include(x => x.User)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        public async Task<int> GetAllEventsCountAsync(CancellationToken cancellationToken)
            => await _context.Events.CountAsync(cancellationToken);

        public async Task<Event?> GetEventDetailsAsync(int eventId, CancellationToken cancellationToken)
        {
            await _context.EventSeats.Where(x => x.EventId == eventId).LoadAsync(cancellationToken);
            await _context.EventPrices.Where(x => x.EventId == eventId).LoadAsync(cancellationToken);

            var @event = await _context.Events
                        .Include(x => x.User)
                        .FirstOrDefaultAsync(x => x.Id == eventId, cancellationToken);

            return @event;
        }

        public async Task<Event> GetEventForTicketsReservationAsync(int eventId, CancellationToken cancellationToken)
        {
            await _context.EventSeats.Where(x => x.EventId == eventId).LoadAsync(cancellationToken);

            return await _context.Events.FirstAsync(x => x.Id == eventId, cancellationToken);
        }
    }
}