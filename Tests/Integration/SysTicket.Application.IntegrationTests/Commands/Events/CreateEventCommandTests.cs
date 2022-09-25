using FluentAssertions;
using NUnit.Framework;
using SysTicket.Application.Commands.Events;
using SysTicket.Application.IntegrationTests.Common;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Entities;

namespace SysTicket.Application.IntegrationTests.Commands.Events
{
    [TestFixture]
    public class CreateEventCommandTests : TestBase
    {
        [Test]
        public async Task Should_Add_Event_To_Database()
        {
            // Arrange
            string expectedTitle = "Test";
            string expectedDescription = "Test";

            DateTime expectedDateFrom = DateTime.Now;
            DateTime expectedDateTo = DateTime.Now.AddDays(1);

            User expectedUser = new User();
            string expectedLogoB64 = "sample";

            Context.Users.Add(expectedUser);
            Context.SaveChanges();

            // Act
            IEntityId eventId = await Mediator.Send(new CreateEventCommand(
                expectedTitle,
                expectedDescription,
                expectedDateFrom,
                expectedDateTo,
                expectedUser.Id,
                expectedLogoB64
            ));

            await UnitOfWork.SaveChangesAsync(default);

            // Assert
            Event? @event = Context.Events.Find(eventId.GetId());

            @event.Should().NotBeNull();

            @event!.Title.Should().Be(expectedTitle);
            @event!.Body.Should().Be(expectedDescription);
            @event!.DateFrom.Should().Be(expectedDateFrom);
            @event!.DateTo.Should().Be(expectedDateTo);
            @event!.UserId.Should().Be(expectedUser.Id);
            @event!.LogoBase64.Should().Be(expectedLogoB64);
        }
    }
}