using MediatR;
using SysTicket.Application.DTO.Reservations;

namespace SysTicket.Application.Queries.Reservations
{
    public record GetReservationDetailsQuery(Guid Id) : IRequest<ReservationDTO>;
}