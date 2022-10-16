using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;

namespace SysTicket.Domain.Builders
{
    internal class EventsSeatBuilder : IEventsSeatBuilder
    {
        public EventSeat Create(
            int eventId,
            string userName,
            string seatNumber,
            DateTime reservationTime,
            string region
        ) => new(eventId, userName, seatNumber, reservationTime, region);
    }
}