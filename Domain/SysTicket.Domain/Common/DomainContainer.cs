using SimpleInjector;
using SimpleInjector.Packaging;
using SysTicket.Domain.Builders;
using SysTicket.Domain.Factories;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Factories;

namespace SysTicket.Domain.Common
{
    public class DomainContainer : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register<IUsersBuilder, UsersBuilder>(Lifestyle.Singleton);
            container.Register<IUsersFactory, UsersFactory>(Lifestyle.Scoped);
        }
    }
}
