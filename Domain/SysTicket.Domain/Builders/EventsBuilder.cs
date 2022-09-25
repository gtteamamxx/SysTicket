using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;

namespace SysTicket.Domain.Builders
{
    internal class EventsBuilder : IEventsBuilder
    {
        public Event Create(
            string title,
            string body,
            DateTime dateFrom,
            DateTime dateTo,
            int userId,
            string logoBase64
        ) => new(title, body, dateFrom, dateTo, userId, logoBase64);
    }
}