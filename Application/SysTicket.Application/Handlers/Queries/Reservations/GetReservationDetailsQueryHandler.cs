using MediatR;
using SysTicket.Application.DTO.Reservations;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Reservations;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Queries.Reservations
{
    internal class GetReservationDetailsQueryHandler : IRequestHandler<GetReservationDetailsQuery, ReservationDTO>
    {
        private readonly IReservationsRepository _reservationsRepository;
        private readonly ISysTicketMapper _sysTicketMapper;

        public GetReservationDetailsQueryHandler(
            IReservationsRepository reservationsRepository,
            ISysTicketMapper sysTicketMapper)
        {
            _reservationsRepository = reservationsRepository;
            _sysTicketMapper = sysTicketMapper;
        }

        public async Task<ReservationDTO> Handle(GetReservationDetailsQuery request, CancellationToken cancellationToken)
        {
            Reservation? reservation = await _reservationsRepository.GetReservationDetailsAsync(request.Id, cancellationToken);

            if (reservation == null) throw new ArgumentNullException(nameof(reservation));

            ReservationDTO result = _sysTicketMapper.Map<ReservationDTO>(reservation);

            return result;
        }
    }
}