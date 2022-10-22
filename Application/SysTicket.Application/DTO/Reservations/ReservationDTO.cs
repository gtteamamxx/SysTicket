namespace SysTicket.Application.DTO.Reservations
{
    public class ReservationDTO
    {
        public EventDetails Event { get; set; } = default!;

        public Guid Id { get; set; }

        public DateTime ReservationDate { get; set; }

        public IEnumerable<EventSeatDetails> Seats { get; set; } = default!;

        public class EventDetails
        {
            public DateTime DateFrom { get; set; }

            public DateTime DateTo { get; set; }

            public IEnumerable<EventDetailsPrice> RegionPrices { get; set; } = Enumerable.Empty<EventDetailsPrice>();

            public string Title { get; set; } = default!;

            public class EventDetailsPrice
            {
                public double Price { get; set; }

                public string Region { get; set; } = default!;
            }
        }

        public class EventSeatDetails
        {
            public string Region { get; set; } = default!;

            public string SeatNumber { get; set; } = default!;
        }
    }
}