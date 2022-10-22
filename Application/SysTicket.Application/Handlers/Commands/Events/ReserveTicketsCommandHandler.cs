using MediatR;
using SysTicket.Application.Commands.Events;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Common;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Events
{
    internal class ReserveTicketsCommandHandler : IRequestHandler<ReserveTicketsCommand, Guid>
    {
        private readonly IEventsRepository _eventsRepository;
        private readonly IEventsSeatBuilder _eventsSeatBuilder;
        private readonly ILayoutService _layoutService;
        private readonly IReservationBuilder _reservationBuilder;
        private readonly ISysTicketUnitOfWork _sysTicketUnitOfWork;

        public ReserveTicketsCommandHandler(
            IEventsSeatBuilder eventsSeatBuilder,
            IEventsRepository eventsRepository,
            ISysTicketUnitOfWork sysTicketUnitOfWork,
            IReservationBuilder reservationBuilder,
            ILayoutService layoutService)
        {
            _eventsSeatBuilder = eventsSeatBuilder;
            _eventsRepository = eventsRepository;
            _sysTicketUnitOfWork = sysTicketUnitOfWork;
            _reservationBuilder = reservationBuilder;
            _layoutService = layoutService;
        }

        public async Task<Guid> Handle(ReserveTicketsCommand request, CancellationToken cancellationToken)
        {
            Event @event = await _eventsRepository.GetEventForTicketsReservationAsync(request.EventId, cancellationToken);

            List<EventSeat> eventSeats = new();

            foreach (string seatId in request.ChairIds)
            {
                string seatNumber = _layoutService.GetChairId(seatId);
                string region = _layoutService.GetRegionByChairId(seatId);

                EventSeat eventSeat = _eventsSeatBuilder.Create(
                    request.EventId,
                    request.UserName,
                    seatNumber,
                    region
                );

                eventSeats.Add(eventSeat);
            }

            Reservation reservation = _reservationBuilder.CreateReservation(@event.Id, eventSeats, request.RequestTime);

            @event.Reservations.Add(reservation);

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);

            return reservation.Id;
        }
    }
}