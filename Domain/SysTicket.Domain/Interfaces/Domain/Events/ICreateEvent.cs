namespace SysTicket.Domain.Interfaces.Domain.Events
{
    public interface ICreateEvent
    {
        string Body { get; }

        DateTime DateFrom { get; }

        DateTime DateTo { get; }

        string LogoBase64 { get; }

        string Title { get; }

        int UserId { get; }
    }
}