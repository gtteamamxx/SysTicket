using SysTicket.Application.Commands.Events;
using SysTicket.Common.CQRS;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Common;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Events
{
    internal class ReserveTicketsCommandHandler : CommandHandler<ReserveTicketsCommand>
    {
        private readonly IEventsRepository _eventsRepository;
        private readonly IEventsSeatBuilder _eventsSeatBuilder;
        private readonly ILayoutService _layoutService;
        private readonly ISysTicketUnitOfWork _sysTicketUnitOfWork;

        public ReserveTicketsCommandHandler(
            IEventsSeatBuilder eventsSeatBuilder,
            IEventsRepository eventsRepository,
            ISysTicketUnitOfWork sysTicketUnitOfWork,
            ILayoutService layoutService)
        {
            _eventsSeatBuilder = eventsSeatBuilder;
            _eventsRepository = eventsRepository;
            _sysTicketUnitOfWork = sysTicketUnitOfWork;
            _layoutService = layoutService;
        }

        public override async Task Handle(ReserveTicketsCommand request, CancellationToken cancellationToken)
        {
            Event @event = await _eventsRepository.GetEventForTicketsReservationAsync(request.EventId, cancellationToken);

            foreach (string seatId in request.ChairIds)
            {
                string seatNumber = _layoutService.GetChairId(seatId);
                string region = _layoutService.GetRegionByChairId(seatId);

                EventSeat eventSeat = _eventsSeatBuilder.Create(
                    request.EventId,
                    request.UserName,
                    seatNumber,
                    request.RequestTime,
                    region
                );

                @event.EventSeats.Add(eventSeat);
            }

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}