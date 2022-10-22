using MediatR;
using SysTicket.Application.DTO.Events;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Events;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Queries.Events
{
    internal class GetEventDetailsQueryHandler : IRequestHandler<GetEventDetailsQuery, EventDetailsDTO>
    {
        private readonly IEventsRepository _eventsRepository;
        private readonly ILayoutService _layoutService;
        private readonly ISysTicketMapper _sysTicketMapper;

        public GetEventDetailsQueryHandler(
            ILayoutService layoutService,
            IEventsRepository eventsRepository,
            ISysTicketMapper sysTicketMapper)
        {
            _layoutService = layoutService;
            _eventsRepository = eventsRepository;
            _sysTicketMapper = sysTicketMapper;
        }

        public async Task<EventDetailsDTO> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
        {
            Event? @event = await _eventsRepository.GetEventDetailsAsync(request.EventId, cancellationToken);

            if (@event is null) throw new ArgumentNullException(nameof(@event));

            EventDetailsDTO result = _sysTicketMapper.Map<EventDetailsDTO>(@event);

            result.NumberOfSeats = _layoutService.GetTotalSeatNumbers(result.Layout);

            return result;
        }
    }
}