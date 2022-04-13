using FluentAssertions;
using FluentValidation;
using NUnit.Framework;
using SysTicket.Application.Commands.Users;
using SysTicket.Application.IntegrationTests.Common;

namespace SysTicket.Application.IntegrationTests.Commands
{
    [TestFixture]
    public class CreateUserCommandTests : TestBase
    {
        [Test]
        public async Task Should_Add_User_To_Database()
        {
            // Arrange
            string expectedUserName = "Test";
            string expectedPassword = "Test2";

            // Act
            await Mediator.Send(new CreateUserCommand(
                UserName: expectedUserName,
                Password: expectedPassword)
            );

            // Assert
            Context.Users
                .FirstOrDefault(x => x.Name == expectedUserName && x.Password == expectedPassword)
                .Should()
                .NotBeNull();
        }

        [Test]
        public void Should_Throw_Exception_When_Name_And_Password_Are_Null()
        {
            // Arrange
            string? expectedUserName = null;
            string? expectedPassword = null;

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                await Mediator.Send(new CreateUserCommand(
                    UserName: expectedUserName!,
                    Password: expectedPassword!)
                );
            });
        }
    }
}
