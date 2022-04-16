using AutoFixture;
using AutoFixture.AutoMoq;

namespace SysTicket.Application.UnitTests.Common
{
    internal class TestBase<T>
    {
        public IFixture Fixture = new Fixture().Customize(new AutoMoqCustomization());

        public T Service => Fixture.Create<T>();
    }
}
