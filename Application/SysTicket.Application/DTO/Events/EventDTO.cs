namespace SysTicket.Application.DTO.Events
{
    public class EventDTO
    {
        public string? Body { get; set; }

        public string? CreationUserName { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string HeaderImgBase64 { get; set; }

        public string? Title { get; set; }
    }
}