using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Builders
{
    internal interface IEventsPriceBuilder
    {
        EventPrice Create(string region, double price);
    }
}