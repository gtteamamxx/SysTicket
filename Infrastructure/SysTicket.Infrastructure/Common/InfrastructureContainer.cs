using SimpleInjector;
using SimpleInjector.Packaging;
using SysTicket.Domain.Interfaces.Common;
using SysTicket.Domain.Interfaces.Repositories;
using SysTicket.Infrastructure.Repositories;

namespace SysTicket.Infrastructure.Common
{
    public class InfrastructureContainer : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register<SysTicketContext, SysTicketContext>(Lifestyle.Scoped);
            container.Register<ISysTicketUnitOfWork, SysTicketUnitOfWork>(Lifestyle.Scoped);

            container.Register<IUsersRepository, UsersRepository>(Lifestyle.Scoped);
            container.Register<IEventsRepository, EventsRepository>(Lifestyle.Scoped);
            container.Register<IReservationsRepository, ReservationsRepository>(Lifestyle.Scoped);
        }
    }
}