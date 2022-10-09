using MediatR;
using SysTicket.Application.DTO.Events;

namespace SysTicket.Application.Queries.Events
{
    public record GetAllEventsByPaginationQuery(int PageIndex, int PageSize) : IRequest<GetAllEventsByPaginationResponse>;

    public class GetAllEventsByPaginationResponse
    {
        public GetAllEventsByPaginationResponse(int numberOfAllEvents, List<EventDTO> events)
        {
            NumberOfAllEvents = numberOfAllEvents;
            Events = events;
        }

        public List<EventDTO> Events { get; } = default!;

        public int NumberOfAllEvents { get; }
    }
}