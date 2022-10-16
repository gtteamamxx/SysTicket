using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Helpers
{
    public interface ILayoutService
    {
        string GetChairId(string chairId);

        string GetRegionByChairId(string chairId);

        int GetTotalSeatNumbers(string layout);

        void ValidateLayout(string layout, RegionPrices regionPrices, out string? error);
    }
}