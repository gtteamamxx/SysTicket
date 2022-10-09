using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;

namespace SysTicket.Domain.Builders
{
    internal class EventsBuilder : IEventsBuilder
    {
        private readonly IEventsPriceBuilder _eventsPriceBuilder;

        public EventsBuilder(IEventsPriceBuilder eventsPriceBuilder)
        {
            _eventsPriceBuilder = eventsPriceBuilder;
        }

        public Event Create(
            string title,
            string body,
            DateTime dateFrom,
            DateTime dateTo,
            int userId,
            string logoBase64,
            string layout,
            RegionPrices regionPrices
        )
        {
            List<EventPrice> regionPricesList = regionPrices
                .Select(value => _eventsPriceBuilder.Create(region: value.Key, price: value.Value))
                .ToList();

            return new(title, body, dateFrom, dateTo, userId, logoBase64, layout, regionPricesList);
        }
    }
}