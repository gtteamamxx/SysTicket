using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Domain.Events;
using SysTicket.Domain.Interfaces.Factories;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Domain.Factories
{
    public class EventsFactory : IEventsFactory
    {
        private readonly IEventsBuilder _eventsBuilder;
        private readonly IEventsRepository _eventsRepository;

        public EventsFactory(
            IEventsBuilder eventsBuilder,
            IEventsRepository eventsRepository)
        {
            _eventsBuilder = eventsBuilder;
            _eventsRepository = eventsRepository;
        }

        public async Task<Event> CreateEventAsync(ICreateEvent input, CancellationToken cancellationToken)
        {
            Event @event = _eventsBuilder.Create(
                input.Title,
                input.Body,
                input.DateFrom,
                input.DateTo,
                input.UserId,
                input.LogoBase64
            );

            await _eventsRepository.CreateEventAsync(@event, cancellationToken);

            return @event;
        }
    }
}