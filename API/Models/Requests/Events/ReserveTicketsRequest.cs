namespace SysTicket.API.Models.Requests.Events
{
    public class ReserveTicketsRequest
    {
        public IEnumerable<string> ChairIds { get; set; } = Enumerable.Empty<string>();

        public string UserName { get; set; } = default!;
    }
}