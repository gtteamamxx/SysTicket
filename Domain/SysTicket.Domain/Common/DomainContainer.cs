using SimpleInjector;
using SimpleInjector.Packaging;
using SysTicket.Domain.Builders;
using SysTicket.Domain.Factories;
using SysTicket.Domain.Helpers;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Factories;
using SysTicket.Domain.Interfaces.Helpers;

namespace SysTicket.Domain.Common
{
    public class DomainContainer : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register<IPasswordHashingService, PasswordHashingService>(Lifestyle.Singleton);
            container.Register<IUsersBuilder, UsersBuilder>(Lifestyle.Singleton);
            container.Register<IUsersFactory, UsersFactory>(Lifestyle.Scoped);

            container.Register<IEventsBuilder, EventsBuilder>(Lifestyle.Singleton);
            container.Register<IEventsFactory, EventsFactory>(Lifestyle.Scoped);
        }
    }
}