using MediatR;

namespace SysTicket.Application.Commands.Events
{
    public class ReserveTicketsCommand : IRequest
    {
        public ReserveTicketsCommand(int eventId, string userName, IEnumerable<string> chairIds)
        {
            EventId = eventId;
            UserName = userName;
            ChairIds = chairIds;

            RequestTime = DateTime.Now;
        }

        public IEnumerable<string> ChairIds { get; }

        public int EventId { get; }

        public DateTime RequestTime { get; }

        public string UserName { get; }
    }
}