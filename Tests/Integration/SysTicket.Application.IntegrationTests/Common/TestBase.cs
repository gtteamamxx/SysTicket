using MediatR;
using NUnit.Framework;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using SysTicket.Application.Common;
using SysTicket.Domain.Common;
using SysTicket.Domain.Interfaces.Common;
using SysTicket.Infrastructure;
using SysTicket.Infrastructure.Common;

namespace SysTicket.Application.IntegrationTests.Common
{
    public class TestBase
    {
        public Container Container = new();

        private Scope _scope = null!;

        public SysTicketContext Context => Container.GetInstance<SysTicketContext>();

        public IMediator Mediator => Container.GetInstance<IMediator>();

        public ISysTicketUnitOfWork UnitOfWork => Container.GetInstance<ISysTicketUnitOfWork>();

        [TearDown]
        public void AfterEachTest()
        {
            _scope.Dispose();
        }

        [SetUp]
        public void BeforeEachTest()
        {
            Container = new Container();

            Container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            Container.Options.AllowOverridingRegistrations = true;

            Container.RegisterPackages(new[]
            {
                typeof(ApplicationContainer).Assembly,
                typeof(DomainContainer).Assembly,
                typeof(InfrastructureContainer).Assembly
            });

            Container.Register<SysTicketContext, SysTicketInMemoryContext>(Lifestyle.Scoped);

            Container.Verify();

            _scope = AsyncScopedLifestyle.BeginScope(Container);
        }
    }
}