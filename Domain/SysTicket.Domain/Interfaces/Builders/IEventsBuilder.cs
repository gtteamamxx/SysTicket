using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Builders
{
    public interface IEventsBuilder
    {
        Event Create(
            string title,
            string body,
            DateTime dateFrom,
            DateTime dateTo,
            int userId,
            string logoBase64,
            string layout,
            string place,
            RegionPrices regionPrices
        );
    }
}