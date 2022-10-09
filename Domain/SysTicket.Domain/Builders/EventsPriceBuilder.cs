using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;

namespace SysTicket.Domain.Builders
{
    internal class EventsPriceBuilder : IEventsPriceBuilder
    {
        public EventPrice Create(string region, double price)
         => new(region, price);
    }
}