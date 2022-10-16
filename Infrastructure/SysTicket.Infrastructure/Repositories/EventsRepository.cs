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

        public Task<List<Event>> GetAllEventsByPaginationAsync(int pageIndex, int pageSize)
            => _context.Events
                .OrderByDescending(x => x.DateFrom)
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .Include(x => x.User)
                .AsNoTracking()
                .ToListAsync();

        public Task<int> GetAllEventsCountAsync()
            => _context.Events.CountAsync();

        public Task<Event?> GetEventDetailsAsync(int eventId)
            => _context.Events
                .Include(x => x.EventPrices)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == eventId);
    }
}