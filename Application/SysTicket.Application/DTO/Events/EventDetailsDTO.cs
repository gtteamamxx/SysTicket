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

        public IEnumerable<EventDetailsPrice> RegionPrices { get; set; } = Enumerable.Empty<EventDetailsPrice>();

        public string Title { get; set; } = default!;

        public class EventDetailsPrice
        {
            public double Price { get; set; }

            public string Region { get; set; } = default!;
        }
    }
}