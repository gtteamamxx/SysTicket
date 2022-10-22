using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Builders
{
    public interface IReservationBuilder
    {
        Reservation CreateReservation(int eventId, IEnumerable<EventSeat> seats, DateTime creationTime);
    }
}