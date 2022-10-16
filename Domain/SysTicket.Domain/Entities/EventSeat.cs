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
            DateTime reservationTime,
            string region)
        {
            EventId = eventId;
            UserName = userName;
            SeatNumber = seatNumber;
            ReservationTime = reservationTime;
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

        public DateTime ReservationTime { get; set; }

        [Required]
        public string SeatNumber { get; set; } = default!;

        [Required]
        public string UserName { get; set; } = default!;
    }
}