using HtmlAgilityPack;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Helpers;

namespace SysTicket.Domain.Helpers
{
    internal class LayoutService : ILayoutService
    {
        public string GetChairId(string chairId)
            => chairId.Split(".")[1];

        public string GetRegionByChairId(string chairId)
            => chairId.Split(".")[0];

        public int GetTotalSeatNumbers(string layout)
        {
            var layoutHtml = new HtmlDocument();

            layoutHtml.LoadHtml(layout);

            HtmlNodeCollection allChairs = layoutHtml.DocumentNode.SelectNodes("//*[contains(@class, 'chair')]");
            if (allChairs == null) return 0;

            return allChairs.Count;
        }

        public void ValidateLayout(string layout, RegionPrices regionPrices, out string? error)
        {
            var layoutHtml = new HtmlDocument();

            try
            {
                layoutHtml.LoadHtml(layout);
            }
            catch
            {
                error = "Układ hali nie jest poprawny";
                return;
            }

            if (layoutHtml.ParseErrors.Any())
            {
                error = layoutHtml.ParseErrors.First().Reason;
                return;
            }

            HtmlNodeCollection allChairs = layoutHtml.DocumentNode.SelectNodes("//*[contains(@class, 'chair')]");
            if (allChairs == null)
            {
                error = "Hala nie posiada krzeseł";
                return;
            }

            List<string> regions = allChairs.Select(chair => GetRegionByChairId(chair.Id))
                .Distinct()
                .ToList();

            if (regions.Any(region => !regionPrices.ContainsKey(region)))
            {
                error = "Nie wszystkie rzędy/krzesła posiadają swoją cenę.";
            }

            error = null;
        }
    }
}