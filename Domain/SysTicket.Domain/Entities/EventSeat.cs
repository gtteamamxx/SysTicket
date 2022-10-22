using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysTicket.Domain.Entities
{
    public class EventSeat
    {
        public EventSeat(
            int eventId,
            string userName,
            string seatNumber,
            string region)
        {
            EventId = eventId;
            UserName = userName;
            SeatNumber = seatNumber;
            Region = region;
        }

        internal EventSeat()
        { }

        [ForeignKey(nameof(EventId))]
        public virtual Event Event { get; set; } = default!;

        public int EventId { get; set; }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Region { get; set; } = default!;

        [ForeignKey(nameof(ReservationId))]
        public virtual Reservation Reservation { get; set; } = default!;

        public Guid ReservationId { get; set; }

        [Required]
        public string SeatNumber { get; set; } = default!;

        [Required]
        public string UserName { get; set; } = default!;
    }
}