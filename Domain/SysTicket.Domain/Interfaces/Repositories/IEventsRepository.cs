using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Repositories
{
    public interface IEventsRepository
    {
        Task CreateEventAsync(Event @event, CancellationToken cancellationToken);

        Task<List<Event>> GetAllEventsByPaginationAsync(int pageIndex, int pageSize, CancellationToken cancellationToken);

        Task<int> GetAllEventsCountAsync(CancellationToken cancellationToken);

        Task<Event?> GetEventDetailsAsync(int eventId, CancellationToken cancellationToken);

        Task<Event> GetEventForTicketsReservationAsync(int eventId, CancellationToken cancellationToken);
    }
}