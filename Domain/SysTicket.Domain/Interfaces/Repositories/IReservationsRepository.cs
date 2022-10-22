using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Repositories
{
    public interface IReservationsRepository
    {
        Task<Reservation?> GetReservationDetailsAsync(Guid id, CancellationToken cancellationToken);
    }
}