using Microsoft.EntityFrameworkCore;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Infrastructure.Repositories
{
    internal class ReservationsRepository : IReservationsRepository
    {
        private readonly SysTicketContext _context;

        public ReservationsRepository(SysTicketContext context)
        {
            _context = context;
        }

        public Task<Reservation?> GetReservationDetailsAsync(Guid id, CancellationToken cancellationToken)
            => _context.Reservations
                .Include(x => x.Event)
                    .ThenInclude(x => x.EventPrices)
                .Include(x => x.Seats)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }
}