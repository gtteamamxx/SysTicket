using NUnit.Framework;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using SysTicket.Domain.Common;
using SysTicket.Infrastructure.Common;

namespace SysTicket.Infrastructure.IntegrationTests.Common
{
    public class RepositoryTestBase<T> where T : class
    {
        public Container Container = new();

        private Scope _scope = null!;

        public SysTicketContext Context => Container.GetInstance<SysTicketContext>();

        public T Repository => Container.GetInstance<T>();

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
            Container.Options.ResolveUnregisteredConcreteTypes = true;

            Container.RegisterPackages(new[]
            {
                typeof(DomainContainer).Assembly,
                typeof(InfrastructureContainer).Assembly
            });

            Container.Register<SysTicketContext, SysTicketInMemoryContext>(Lifestyle.Scoped);

            Container.Verify();

            _scope = AsyncScopedLifestyle.BeginScope(Container);
        }
    }
}