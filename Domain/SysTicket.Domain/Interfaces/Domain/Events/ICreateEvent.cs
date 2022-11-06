using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Domain.Events
{
    public interface ICreateEvent
    {
        string Body { get; }

        DateTime DateFrom { get; }

        DateTime DateTo { get; }

        string Layout { get; }

        string LogoBase64 { get; }

        string Place { get; }

        RegionPrices RegionPrices { get; }

        string Title { get; }

        int UserId { get; }
    }
}