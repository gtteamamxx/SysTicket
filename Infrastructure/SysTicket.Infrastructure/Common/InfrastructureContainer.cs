using SimpleInjector;
using SimpleInjector.Packaging;
using SysTicket.Domain.Interfaces.Repositories;
using SysTicket.Infrastructure.Repositories;

namespace SysTicket.Infrastructure.Common
{
    public class InfrastructureContainer : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register<IUsersRepository, UsersRepository>(Lifestyle.Scoped);
        }
    }
}
