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

        public Task<List<Event>> GetAllEventsByPaginationAsync(int pageIndex, int pageSize, CancellationToken cancellationToken)
            => _context.Events
                .OrderByDescending(x => x.DateFrom)
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .Include(x => x.User)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        public Task<int> GetAllEventsCountAsync(CancellationToken cancellationToken)
            => _context.Events.CountAsync(cancellationToken);

        public Task<Event?> GetEventDetailsAsync(int eventId, CancellationToken cancellationToken)
            => _context.Events
                .Include(x => x.EventPrices)
                .Include(x => x.User)
                .Include(x => x.EventSeats)
                .FirstOrDefaultAsync(x => x.Id == eventId, cancellationToken);

        public Task<Event> GetEventForTicketsReservationAsync(int eventId, CancellationToken cancellationToken)
            => _context.Events
                .Include(x => x.EventSeats)
                .FirstAsync(x => x.Id == eventId, cancellationToken);
    }
}