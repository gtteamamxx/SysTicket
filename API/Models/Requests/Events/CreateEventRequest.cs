namespace SysTicket.API.Models.Requests.Events
{
    public class CreateEventRequest
    {
        public string? Body { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string? LogoBase64 { get; set; }

        public string? Title { get; set; }

        public int UserId { get; set; }
    }
}