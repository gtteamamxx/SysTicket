using MediatR;
using SysTicket.Application.DTO.Events;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Events;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Queries.Events
{
    internal class GetAllEventsByPaginationQueryHandler : IRequestHandler<GetAllEventsByPaginationQuery, GetAllEventsByPaginationResponse>
    {
        private readonly IEventsRepository _eventsRepository;
        private readonly ISysTicketMapper _sysTicketMapper;

        public GetAllEventsByPaginationQueryHandler(
            IEventsRepository eventsRepository,
            ISysTicketMapper sysTicketMapper)
        {
            _eventsRepository = eventsRepository;
            _sysTicketMapper = sysTicketMapper;
        }

        public async Task<GetAllEventsByPaginationResponse> Handle(GetAllEventsByPaginationQuery request, CancellationToken cancellationToken)
        {
            List<Event> events = await _eventsRepository.GetAllEventsByPaginationAsync(
                request.PageIndex,
                request.PageSize,
                cancellationToken
            );

            int allEventsCount = await _eventsRepository.GetAllEventsCountAsync(cancellationToken);

            var dtoEvents = _sysTicketMapper.Map<List<EventDTO>>(events);

            var result = new GetAllEventsByPaginationResponse(
                allEventsCount,
                dtoEvents
            );

            return result;
        }
    }
}