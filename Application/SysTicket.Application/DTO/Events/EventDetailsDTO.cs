namespace SysTicket.Application.DTO.Events
{
    public class EventDetailsDTO
    {
        public string? Body { get; set; }

        public string CreationUserName { get; set; } = default!;

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string HeaderImgBase64 { get; set; } = default!;

        public int Id { get; set; }

        public string Layout { get; set; } = default!;

        public int NumberOfSeats { get; set; }

        public IEnumerable<EventDetailsPrice> RegionPrices { get; set; } = Enumerable.Empty<EventDetailsPrice>();

        public IEnumerable<EventDetailsSeat> Seats { get; set; } = Enumerable.Empty<EventDetailsSeat>();

        public string Title { get; set; } = default!;

        public class EventDetailsPrice
        {
            public double Price { get; set; }

            public string Region { get; set; } = default!;
        }

        public class EventDetailsSeat
        {
            public string Region { get; set; } = default!;

            public string SeatNumber { get; set; } = default!;
        }
    }
}