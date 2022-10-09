using SysTicket.Domain.Entities;

namespace SysTicket.API.Models.Requests.Events
{
    public class CreateEventRequest
    {
        public string? Body { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string Layout { get; set; } = default!;

        public string? LogoBase64 { get; set; }

        public RegionPrices RegionPrices { get; set; } = default!;

        public string? Title { get; set; }

        public int UserId { get; set; }
    }
}