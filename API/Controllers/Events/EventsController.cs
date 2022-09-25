using MediatR;
using Microsoft.AspNetCore.Mvc;
using SysTicket.API.Models.Requests.Events;
using SysTicket.Application.Commands.Events;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Interfaces.Common;

namespace SysTicket.API.Controllers.Events
{
    [Route("api/events")]
    [ApiController]
    public class EventsController
    {
        private readonly IMediator _mediator;
        private readonly ISysTicketUnitOfWork _sysTicketUnitOfWork;

        public EventsController(
            IMediator mediator,
            ISysTicketUnitOfWork sysTicketUnitOfWork)
        {
            _mediator = mediator;
            _sysTicketUnitOfWork = sysTicketUnitOfWork;
        }

        [HttpPost]
        public async Task<int> CreateEventAsync([FromBody] CreateEventRequest createEventRequest, CancellationToken cancellationToken)
        {
            IEntityId result = await _mediator.Send(new CreateEventCommand(
                    createEventRequest.Title!,
                    createEventRequest.Body!,
                    createEventRequest.DateFrom,
                    createEventRequest.DateTo,
                    createEventRequest.UserId,
                    createEventRequest.LogoBase64!
                ),
                cancellationToken
            );

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);

            return result.GetId();
        }
    }
}