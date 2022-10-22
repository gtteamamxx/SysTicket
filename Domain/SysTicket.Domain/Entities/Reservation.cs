using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysTicket.Domain.Entities
{
    public class Reservation
    {
        public Reservation(int eventId, IEnumerable<EventSeat> seats, DateTime reservationDate)
        {
            Id = Guid.NewGuid();

            EventId = eventId;

            foreach (EventSeat seat in seats)
            {
                Seats.Add(seat);
            }

            ReservationDate = reservationDate;
        }

        internal Reservation()
        {
        }

        [ForeignKey(nameof(EventId))]
        public Event Event { get; set; } = default!;

        public int EventId { get; set; }

        [Key]
        public Guid Id { get; set; }

        public DateTime ReservationDate { get; set; }

        public ICollection<EventSeat> Seats { get; set; } = new HashSet<EventSeat>();
    }
}