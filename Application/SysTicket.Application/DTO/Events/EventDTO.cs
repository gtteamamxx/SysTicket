namespace SysTicket.Application.DTO.Events
{
    public class EventDTO
    {
        public string? Body { get; set; }

        public string CreationUserName { get; set; } = default!;

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string HeaderImgBase64 { get; set; } = default!;

        public int Id { get; set; }

        public string Place { get; set; } = default!;

        public string? Title { get; set; }
    }
}