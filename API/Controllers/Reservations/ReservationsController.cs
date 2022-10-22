using MediatR;
using Microsoft.AspNetCore.Mvc;
using SysTicket.Application.DTO.Reservations;
using SysTicket.Application.Queries.Reservations;

namespace SysTicket.API.Controllers.Reservations
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController
    {
        private readonly IMediator _mediator;

        public ReservationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public Task<ReservationDTO> GetReservationAsync([FromRoute] Guid id)
           => _mediator.Send(new GetReservationDetailsQuery(id));
    }
}