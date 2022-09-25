using MediatR;
using SysTicket.Application.Commands.Events;
using SysTicket.Application.Common;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Factories;

namespace SysTicket.Application.Handlers.Commands.Events
{
    internal class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, IEntityId>
    {
        private readonly IEventsFactory _eventsFactory;

        public CreateEventCommandHandler(IEventsFactory eventsFactory)
        {
            _eventsFactory = eventsFactory;
        }

        public async Task<IEntityId> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            Event @event = await _eventsFactory.CreateEventAsync(request, cancellationToken);

            return new EntityId(@event);
        }
    }
}