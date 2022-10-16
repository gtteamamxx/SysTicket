using MediatR;
using SysTicket.Application.DTO.Events;

namespace SysTicket.Application.Queries.Events
{
    public record GetEventDetailsQuery(int EventId) : IRequest<EventDetailsDTO>;
}