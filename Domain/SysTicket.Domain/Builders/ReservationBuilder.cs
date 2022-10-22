using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;

namespace SysTicket.Domain.Builders
{
    internal class ReservationBuilder : IReservationBuilder
    {
        public Reservation CreateReservation(int eventId, IEnumerable<EventSeat> seats, DateTime reservationDate)
        {
            var reservation = new Reservation(eventId, seats, reservationDate);

            foreach (EventSeat seat in reservation.Seats)
            {
                seat.Reservation = reservation;
            }

            return reservation;
        }
    }
}