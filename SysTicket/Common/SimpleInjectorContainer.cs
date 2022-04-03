using SimpleInjector;
using SysTicket.Application.Common;

namespace SysTicket.API.Common
{
    public class SimpleInjectorContainer
    {
        public static Container Container = new();

        public static void InitializeContainer()
        {
            Container.RegisterPackages(new[] { typeof(ApplicationContainer).Assembly });

            Container.Verify();
        }
    }
}
