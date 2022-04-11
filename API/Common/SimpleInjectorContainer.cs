using SimpleInjector;
using SysTicket.Application.Common;
using SysTicket.Domain.Common;
using SysTicket.Infrastructure.Common;

namespace SysTicket.API.Common
{
    public class SimpleInjectorContainer
    {
        public static Container Container = new();

        public static void InitializeContainer()
        {
            Container.RegisterPackages(new[] 
            { 
                typeof(ApplicationContainer).Assembly, 
                typeof(DomainContainer).Assembly, 
                typeof(InfrastructureContainer).Assembly 
            });

            Container.Verify();
        }
    }
}
