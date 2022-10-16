using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Builders
{
    public interface IEventsSeatBuilder
    {
        EventSeat Create(
            int eventId,
            string userName,
            string seatNumber,
            DateTime reservationTime,
            string region
        );
    }
}