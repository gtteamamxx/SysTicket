using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Repositories
{
    public interface IEventsRepository
    {
        Task CreateEventAsync(Event @event, CancellationToken cancellationToken);

        Task<List<Event>> GetAllEventsByPaginationAsync(int pageIndex, int pageSize);

        Task<int> GetAllEventsCountAsync();

        Task<Event?> GetEventDetailsAsync(int eventId);
    }
}