using MediatR.SimpleInjector;
using SimpleInjector;
using SimpleInjector.Packaging;
using SysTicket.Domain.Common;

namespace SysTicket.Application.Common
{
    public class ApplicationContainer : IPackage
    {
        public void RegisterServices(Container container)
        {

            container.BuildMediator();
        }
    }
}
